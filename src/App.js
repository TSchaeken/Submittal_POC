import React from 'react';
import { hot } from 'react-hot-loader/root';

import Fabric from './components/Canvas';
import Viewer from './components/Viewer';

import './App.scss';

const App = () => (
  <div className="Container">
    <Fabric />
    <Viewer />
  </div>
);

export default hot(App);
