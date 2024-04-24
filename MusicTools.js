const MusicTools = {
  standardpitch: 440,
  middleC: "C4",
  /**
   *
   * converts midi to freq
   * @param {number} midiPitch - MIDI Note Number
   * @returns {number} Freq in Hz
   * @example midiPitchtoFrequency(60)
   * //returns 261.65
   */
  midiPitchToFrequency: function (midiPitch) {
    return this.standardpitch * Math.pow(2, (midiPitch - 69) / 12);
  },
  /**
   * Converts a frequency in Hz to the corresponding MIDI pitch number.
   * @param {number} frequency - The frequency in Hz.
   * @returns {number} The MIDI pitch number.
   */
  frequencyToMidiPitch: function (frequency) {
    return 69 + 12 * Math.log2(frequency / this.standardpitch);
  },
  /**
   * Convert Linear Amplitude to dBs Full Scale
   * @param {number} linAmp
   * @returns {number} dBFS
   */
  linearAmplitudeTodBFS: function (linAmp) {
    return 20 * Math.log10(linAmp);
  },
  /**
   * Converts dBFS to Linear Amplitude
   * @param {number} dBFS
   * @param {boolean}
   * @returns {number} Linear Amplitude
   */
  dbfsToLinearAmplitude: function (dBFS, int16) {
    let linAmp = Math.pow(10, dBFS / 20);
    if (int16) {
      linAmp = Math.floor(linAmp * 32768);
    }
    return linAmp;
  },
};

export { MusicTools };
