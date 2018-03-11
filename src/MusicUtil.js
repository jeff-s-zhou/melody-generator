import Tone from 'tone';

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

//Singleton

const NUM_NOTES_IN_OCTAVE = 12;
const IONIAN_SCALE = [2, 2, 1, 2, 2, 2, 1];


class MusicUtil {
  generateMelody() {
    const synth = new Tone.Synth().toMaster();
    const triggerSynth = (note, duration, time) => this.triggerInstrument(synth, note, duration, time);
    const range = this.generateNoteRange("A2", "A3", "A2", IONIAN_SCALE);
    Tone.Transport.stop()
    var current_time = Tone.Time("0")
    for (let midi_note of range) {
      let sci_note = Tone.Frequency(midi_note, "midi")
      Tone.Transport.schedule(time => triggerSynth(sci_note, '8n', time), current_time.toNotation())
      current_time.add("4n")
    }
    Tone.Transport.start('+0.1')
  }

  triggerInstrument(instrument, note, duration, time){
    instrument.triggerAttackRelease(note, duration, time)
  }

  //gives us all possible notes within the given range in the proper key, relative to the given root key
  generateNoteRange(lowSciNote, highSciNote, Key, scaleIncrements) {
    const lowNote = Tone.Frequency(lowSciNote).toMidi();
    const highNote = Tone.Frequency(highSciNote).toMidi();
    const rootNote = (Tone.Frequency(Key).toMidi()); 
    const numOctaves = Math.ceil((highNote - lowNote) / NUM_NOTES_IN_OCTAVE);
    let lowRoot = rootNote;
    while (lowRoot > lowNote) {
      lowRoot -= NUM_NOTES_IN_OCTAVE;
    }

    let notes = [...this.generateNotes(lowRoot, scaleIncrements, numOctaves)];
    notes.unshift(lowRoot); //include the lower root

    //now filter the notes so we're within the given range
    return notes.filter(note => note >= lowNote && note <= highNote);
  }

  //generator iterator that, given a starting root note and a scale in the form of increments, expands out the scale for the given number of scale
  * generateNotes(startRoot, scaleIncrements, numOctaves) {
    let currentNote = startRoot;
    let index = 0;
    while(index < numOctaves * scaleIncrements.length) {
      let increment = scaleIncrements[index++ % scaleIncrements.length];
      yield currentNote+=increment;
    }
  }

  generateRandomNote(note_range) {
  }
}



export default new MusicUtil();