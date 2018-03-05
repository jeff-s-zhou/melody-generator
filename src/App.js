import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';

class App extends Component {

  triggerInstrument(instrument, note, duration, time){
    instrument.triggerAttackRelease(note, duration, time)
  }

  generate_melody() {
    var synth = new Tone.Synth().toMaster();
    const triggerSynth = (note, duration, time) => this.triggerInstrument(synth, note, duration, time);

    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), 0)
    Tone.Transport.schedule(time => triggerSynth('D2', '8n', time), '2*8t')
    Tone.Transport.schedule(time => triggerSynth('E2', '8n', time), '4n + 8t')
    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), '4n + 2*8t')
    Tone.Transport.start('+0.1')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melody Generator</h1>
        </header>
        <button className="square" onClick={() => this.generate_melody()}>
          Hello
        </button>
      </div>
    );
  }
}

export default App;
