import React, { Component } from 'react';
import './App.css';
import MusicUtil from './MusicUtil';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melody Generator</h1>
        </header>
        <button className="square" onClick={() => MusicUtil.generateMelody()}>
          Hello
        </button>
      </div>
    );
  }
}

export default App;
