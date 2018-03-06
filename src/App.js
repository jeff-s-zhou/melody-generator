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
    var synth = new Tone.Synth().toMaster();
    const triggerSynth = (note, duration, time) => this.triggerInstrument(synth, note, duration, time);

    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), 0)
    Tone.Transport.schedule(time => triggerSynth('D#2', '8n', time), '2*8t')
    Tone.Transport.schedule(time => triggerSynth('E2', '8n', time), '4n + 8t')
    Tone.Transport.schedule(time => triggerSynth('C2', '8n', time), '4n + 2*8t')
    Tone.Transport.start('+0.1')
  }

  //gives us all possible notes within the given range in the proper key, relative to the given root key
  generateNoteRange(lowNote, highNote, rootKey) {
    const rootMidiNote = (Tone.Frequency(rootKey).toMidi()); 
    const anchorMidiNote = rootMidiNote - 1;//actually get the one right before the root, since our first increment is 1
    const lowMidiNote = Tone.Frequency(lowNote).toMidi();
    const highMidiNote = Tone.Frequency(highNote).toMidi();

    var scaleIncrements = [1, 2, 2, 1, 2, 2, 2]
    const NumberOfNotes = highMidiNote - lowMidiNote
    const NumScales = Math.ceil(NumberOfNotes / 7.0) //TODO: Is a scale 8 or 7 notes lmao

    const reducer = (accumulator, current_value) => accumulator.concat(scaleIncrements)
    var range = [...Array(NumScales).keys()] //get an array of the length of numScales, initialized values don't matter
    var expandedScaleIncrements = range.reduce(reducer, []) //basically we repeat scaleIncrements for the number of scales we require

    const lowAnchor = anchorMidiNote - NumScales * 7 //TODO: Is a scale 8 or 7 notes lmao

    //multiply the scale increments list out so it goes from low root to high root
    const reducer = (accumulator, current_value) => accumulator.push(current_value + [accumulator[accumulator.length-1]])
    var notes = expandedScaleIncrements.reduce(reducer, [lowAnchor])

    //now filter the notes so we're within the given range
    var trimmedNotes = notes.filter(note => note >= lowMidiNote and note <= highMidiNote)
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
