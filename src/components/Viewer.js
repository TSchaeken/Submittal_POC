import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import file from '../sample.pdf';
import Canvas from './Canvas';

export default class Viewer extends Component {
  state = {
    pageNumber: 1,
    numPages: null,
    pageWidth: 600,
    pageHeight: null,
    edit: false
  };

  onDocumentLoadSuccess = document => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1
    });
  };

  onPageLoadSuccess = page => {
    const { height, width } = page;
    this.setState({
      pageWidth: width,
      pageHeight: height
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  switchEdit = () => {
    const { edit } = this.state;
    if (edit && window.confirm('Are you sure you want to exit Edit Mode?')) {
      this.setState({
        edit: !edit
      });
    } else
      this.setState(prevState => ({
        edit: !prevState.edit
      }));
  };

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { pageNumber, numPages, pageWidth, pageHeight, edit } = this.state;
    return (
      <div className="viewLayer">
        <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            width={pageWidth}
            onLoadSuccess={this.onPageLoadSuccess}
            className="pageLayer"
          />
        </Document>
        {edit && <Canvas width={pageWidth} height={pageHeight} />}
        <>
          Page {pageNumber} of {numPages}
          <button type="button" onClick={this.previousPage}>
            Prev Page
          </button>
          <button type="button" onClick={this.nextPage}>
            Next Page
          </button>
          <button type="button" onClick={this.switchEdit}>
            {edit ? `Finish Edit` : `Enable Edit`}
          </button>
        </>
      </div>
    );
  }
}
