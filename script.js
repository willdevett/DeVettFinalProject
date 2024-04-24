//Imports functions from Music tools
import { MusicTools } from "./MusicTools.js";

//Creating audio context
const audCtx = new (AudioContext || webkit.AudioContext)();

//Starts Audio Context
const startAudioButton = document.getElementById("startAudio");

//set initial mic source
let micSource = null;

//initializing gain nodes
const inputSwitch = audCtx.createGain(); //controls input signal level
const drySig = audCtx.createGain();
const wetSig = audCtx.createGain();
const volume = audCtx.createGain();

//initializing fx nodes
const delay = audCtx.createDelay(5.0);
const feedback = audCtx.createGain();

//routing
inputSwitch.connect(drySig);
wetSig.connect(volume);
drySig.connect(volume);
volume.connect(audCtx.destination);
delay.connect(feedback);
feedback.connect(delay);

startAudioButton.addEventListener("click", function () {
  console.log(audCtx.resume());
});

delay.delayTime.setValueAtTime(0.25, audCtx.currentTime); // Set initial delay time.
feedback.gain.setValueAtTime(0.25, audCtx.currentTime); // Set initial delay feedback level.

let enableMicInput = document.getElementById("startInput");

enableMicInput.addEventListener("click", function () {
  console.log("Input Enabled");

  selectMicInput();
});

const selectMicInput = async function () {
  try {
    // Setup a media stream constraint object with low latency settings
    const audioConstraints = { audio: { latency: 0.02 } };

    // Access the user's media device(microphone)
    const micInput = await navigator.mediaDevices.getUserMedia(
      audioConstraints
    );

    // Create a new MediaStreamAudioSourceNode using the microphone input stream
    micSource = audCtx.createMediaStreamSource(micInput);

    // Connect the microphone source to the 'inputSwitch' node for further audio processing
    micSource.connect(inputSwitch);
  } catch (err) {
    // If an error occurs while accessing microphone, log it to the console
    console.error("Error accessing the microphone:", err);
  }
};

let delayElement = document.getElementById("delayOn");

delayElement.addEventListener("click", function () {
  if ("click") {
    // Connect the 'inputSwitch' node to the 'delay' node
    // This implies that the audio signal is directed into a delay function
    inputSwitch.connect(delay);

    // Connect the 'delay' node to the 'wetSig' node
    // The delayed audio signal is now directed into the 'wetSig'
    delay.connect(wetSig);
    console.log("delay is on");
  } else {
    // If the checkbox is not checked (i.e., unchecked):

    // Disconnect 'inputSwitch' from 'delay'
    // This stops the audio signal from being fed into the delay function
    inputSwitch.disconnect(delay);

    // Disconnect the 'delay' from the 'wetSig'
    // This stops the delayed audio signal from being sent to the 'wetSig'
    delay.disconnect(wetSig);
    console.log("delay is off");
  }
});
