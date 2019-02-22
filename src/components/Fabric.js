import React from 'react';
import { fabric } from 'fabric';
import PropTypes from 'prop-types';

class Fabric extends React.Component {
  state = {
    drawingMode: false,
    savedJSON: [],
    savedImage: []
  };

  componentDidMount() {
    this.fabricCanvas = new fabric.Canvas('main-canvas');
    document.addEventListener('keydown', this.deleteObject, false);
  }

  componentWillUnmount() {
    this.fabricCanvas.dispose();
    document.removeEventListener('keydown', this.deleteObject, false);
  }

  enableDraw = () => {
    const { drawingMode } = this.state;
    this.fabricCanvas.isDrawingMode = !drawingMode;
    this.setState({
      drawingMode: this.fabricCanvas.isDrawingMode
    });
  };

  addNote = () => {
    const canvas = this.fabricCanvas;
    const note = new fabric.Textbox('Notes...');
    canvas.add(note);
    note.center();
  };

  saveToJSON = () => {
    const json = this.fabricCanvas.toJSON();
    sessionStorage.setItem('json', json);
    this.setState(prevState => ({
      savedJSON: [...prevState.savedJSON, json]
    }));
  };

  saveToImage = () => {
    const image = this.fabricCanvas.toDataURL();
    sessionStorage.setItem('image', image);
    this.setState(prevState => ({
      savedImage: [...prevState.savedImage, image]
    }));
  };

  loadImage = () => {
    const { savedImage } = this.state;
    const canvas = this.fabricCanvas;
    fabric.Image.fromURL(savedImage[0], img => {
      canvas.add(img);
      canvas.renderAll();
    });
  };

  loadJSON = () => {
    const { savedJSON } = this.state;
    const canvas = this.fabricCanvas;
    canvas.loadFromJSON(savedJSON[0]);
  };

  deleteObject = e => {
    if (e.keyCode === 46) {
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
    const { drawingMode, savedJSON, savedImage } = this.state;
    const { height, width } = this.props;
    return (
      <>
        <div className="editLayer">
          <canvas id="main-canvas" width={`${width}px`} height={`${height}px`} />
        </div>
        <button type="button" onClick={this.enableDraw}>
          {drawingMode ? 'Disable Draw' : 'Enable Draw'}
        </button>
        <button type="button" onClick={this.saveToJSON}>
          Save as JSON
        </button>
        <button type="button" onClick={this.saveToImage}>
          Save as Image
        </button>
        <button type="button" onClick={this.addNote}>
          Add note
        </button>
        {savedJSON.length > 0 && (
          <button type="button" onClick={this.loadJSON}>
            load JSON
          </button>
        )}
        {savedImage.length > 0 && (
          <button type="button" onClick={this.loadImage}>
            load Image
          </button>
        )}
      </>
    );
  }
}

Fabric.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Fabric;
