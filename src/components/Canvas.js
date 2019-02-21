import React from 'react';
import { fabric } from 'fabric';
import PropTypes from 'prop-types';

class Fabric extends React.Component {
  state = {
    drawingMode: false
  };

  componentDidMount() {
    this.fabricCanvas = new fabric.Canvas('main-canvas');
  }

  enableDraw = () => {
    const { drawingMode } = this.state;
    this.fabricCanvas.isDrawingMode = !drawingMode;
    this.setState({
      drawingMode: this.fabricCanvas.isDrawingMode
    });
  };

  addNote = () => {
    const note = new fabric.Textbox('Notes...');
    this.fabricCanvas.add(note);
    note.center();
  };

  render() {
    const { drawingMode } = this.state;
    const { height, width } = this.props;
    return (
      <>
        <div className="editLayer">
          <canvas id="main-canvas" width={`${width}px`} height={`${height}px`} />
        </div>
        <button type="button" onClick={this.enableDraw}>
          {drawingMode ? 'Disable Draw' : 'Enable Draw'}
        </button>
        <button type="button" onClick={this.addNote}>
          Add a note
        </button>
      </>
    );
  }
}

Fabric.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Fabric;
