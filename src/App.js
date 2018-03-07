import React, { Component } from 'react';
import './App.css';
import Tone from 'tone';

class App extends Component {
  //TODO: put music stuff into its own class once it gets fat
  triggerInstrument(instrument, note, duration, time){
    instrument.triggerAttackRelease(note, duration, time)
  }


  //basic parameters we want to start with: 
  /*
  Tonality
    key
    mode: ionian, dorian, etc.
    tonic endpoint
  Proximity and Range
    proximity factor (the higher, the smaller the intervals)
    bottom
    top
    repetition frequency (how often notes are repeated)
  Rhythm and Meter
    tempo (in BPM)
  */

  //Tone.Frequency("A4").harmonize([0, 3, 7]); //["A4", "C5", "E5"] #this is what we do
  //Tone.Frequency("A4").transpose(3); //"C5"


  generateMelody() {
    const synth = new Tone.Synth().toMaster();
    const triggerSynth = (note, duration, time) => this.triggerInstrument(synth, note, duration, time);

    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), 0)
    Tone.Transport.schedule(time => triggerSynth('D#2', '8n', time), '2*8t')
    Tone.Transport.schedule(time => triggerSynth('E2', '8n', time), '4n + 8t')
    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), '4n + 2*8t')
    Tone.Transport.start('+0.1')
  }

  //gives us all possible notes within the given range in the proper key, relative to the given root key
  generateNoteRange(lowSciNote, highSciNote, Key) {
    const rootNote = (Tone.Frequency(Key).toMidi()); 
    const lowNote = Tone.Frequency(lowSciNote).toMidi();
    const highNote = Tone.Frequency(highSciNote).toMidi();

    const scaleIncrements = [2, 2, 1, 2, 2, 2, 1]
    const numberOfNotes = highNote - lowNote
    const numScales = Math.ceil(numberOfNotes / scaleIncrements.length)


    //generator iterator that, given a starting root note, expands out the scale for the given number of scales
    function* getNotes(startRoot, scaleIncrements, numScales) {
      let currentNote = startRoot;
      let index = 0;
      while(index < numScales * scaleIncrements.length) {
        let increment = scaleIncrements[index++ % scaleIncrements.length];
        yield currentNote+=increment;
      }
    }

    const lowRoot = rootNote - (numScales * scaleIncrements.length)

    const notes = [...getNotes(lowRoot, scaleIncrements, numScales)];

    //now filter the notes so we're within the given range
    const trimmedNotes = notes.filter(note => note >= lowMidiNote and note <= highMidiNote)

    return trimmedNotes;
  }

  generateRandomNote(note_range) {
    //based on the previous note, and the given parameters
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melody Generator</h1>
        </header>
        <button className="square" onClick={() => this.generateMelody()}>
          Hello
        </button>
      </div>
    );
  }
}

export default App;
