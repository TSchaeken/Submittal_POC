import React from 'react';
import { fabric } from 'fabric';

class Fabric extends React.Component {
  componentDidMount() {
    this.fabricCanvas = new fabric.Canvas('main-canvas');
    this.fabricCanvas.on('mouse:dblclick', options => {
      this.fabricCanvas.add(
        new fabric.IText('hello world', { left: options.e.clientX, top: options.e.clientY })
      );
    });
  }

  addCircle = () => {
    this.fabricCanvas.isDrawingMode = !this.fabricCanvas.isDrawingMode;
  };

  render() {
    return (
      <div className="editLayer">
        <canvas id="main-canvas" width="800px" height="800px" />
        <button type="button" onClick={this.addCircle}>
          circle
        </button>
      </div>
    );
  }
}

export default Fabric;
