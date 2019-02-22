import React from 'react';
import { fabric } from 'fabric';
import PropTypes from 'prop-types';

class Fabric extends React.Component {
  state = {
    drawingMode: false,
    jsons: [],
    images: []
  };

  componentDidMount() {
    this.fabricCanvas = new fabric.Canvas('main-canvas');
    document.addEventListener('keydown', this.deleteObject, false);
    window.addEventListener('beforeunload', this.saveData.bind(this));
    this.getData();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.deleteObject, false);
    window.removeEventListener('beforeunload', this.saveData.bind(this));
    this.saveData();
    this.fabricCanvas.dispose();
  }

  saveData() {
    for (const key in this.state) {
      sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  getData() {
    for (const key in this.state) {
      if (sessionStorage.hasOwnProperty(key)) {
        let value = sessionStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  enableDraw = () => {
    const { drawingMode } = this.state;
    this.fabricCanvas.isDrawingMode = !drawingMode;
    this.setState({
      drawingMode: this.fabricCanvas.isDrawingMode
    });
  };

  clearAll = () => {
    const canvas = this.fabricCanvas;
    if (window.confirm('Clear canvas?')) {
      canvas.clear();
    }
  };

  addNote = () => {
    const canvas = this.fabricCanvas;
    const note = new fabric.Textbox('Notes...');
    canvas.add(note);
    note.center();
  };

  saveToJSON = () => {
    const { jsons } = this.state;
    const { user } = this.props;
    const newItem = { date: Date.now(), owner: user, content: this.fabricCanvas.toJSON() };
    const saveJSON = [...jsons, newItem];
    this.setState({
      jsons: saveJSON
    });
  };

  loadJSON = () => {
    const canvas = this.fabricCanvas;
    const { jsons } = this.state;
    canvas.loadFromJSON(jsons[0].content);
  };

  saveToImage = () => {
    const image = this.fabricCanvas.toDataURL();
    this.setState(prevState => ({
      images: [...prevState.images, image]
    }));
  };

  loadImage = () => {
    const { images } = this.state;
    const canvas = this.fabricCanvas;
    fabric.Image.fromURL(images[0], img => {
      canvas.add(img);
      canvas.renderAll();
    });
  };

  deleteObject = e => {
    if (e.keyCode === (46 || 8)) {
      const selected = this.fabricCanvas.getActiveObjects();

      if (selected) {
        if (window.confirm('Deleted selected items?')) {
          this.fabricCanvas.remove(...selected);
        }
        this.fabricCanvas.discardActiveObject().renderAll();
      }
    }
  };

  render() {
    const { drawingMode, jsons, images } = this.state;
    const { height, width } = this.props;
    return (
      <>
        <div className="edit-layer">
          <canvas id="main-canvas" width={`${width}px`} height={`${height}px`} />
        </div>
        <div className="edit-controls">
          <button type="button" onClick={this.enableDraw}>
            {drawingMode ? 'Disable Draw' : 'Enable Draw'}
          </button>
          <button type="button" onClick={this.addNote}>
            Add Note
          </button>
          <button type="button" onClick={this.saveToJSON}>
            Save as Editable
          </button>
          <button type="button" onClick={this.loadJSON} disabled={!(jsons.length > 0)}>
            Continue Edit
          </button>
          <button type="button" onClick={this.saveToImage}>
            Save as Overlay
          </button>
          <button type="button" onClick={this.loadImage} disabled={!(images.length > 0)}>
            Load Saved Overlay
          </button>
          <button type="button" onClick={this.clearAll}>
            clear
          </button>
        </div>
      </>
    );
  }
}

Fabric.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Fabric;
