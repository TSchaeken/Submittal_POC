import React from 'react';
import { hot } from 'react-hot-loader/root';

import Viewer from './components/Viewer';

import './App.scss';

const App = () => (
  <div className="Container">
    <Viewer />
  </div>
);

export default hot(App);
