import React, { Component } from 'react';
import { Page, Document } from 'react-pdf';
import file from '../sample.pdf';

export default class Viewer extends Component {
  state = {
    pageNumber: 1,
    numPages: null
  };

  onDocumentLoadSuccess = document => {
    console.log(document);
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div className="viewLayer">
        <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} width={600} />
        </Document>
        <>
          Page {pageNumber} of {numPages}
          <button type="button" onClick={this.nextPage}>
            Next Page
          </button>
          <button type="button" onClick={this.previousPage}>
            Prev Page
          </button>
        </>
      </div>
    );
  }
}
