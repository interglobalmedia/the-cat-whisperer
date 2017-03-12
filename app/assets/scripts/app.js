import $ from 'jquery';

const supportmsg = document.getElementById('support-msg');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const speechMsgText = document.querySelector('[name="text"]');
const voiceSelect = document.querySelector('#voice');
let volumeInput = document.querySelector('[name="volume"]');
let rateInput = document.querySelector('[name="rate"]');
let pitchInput = document.querySelector('[name="pitch"]');
const audio = new Audio('assets/audio/06-Power-Animals.mp3');
const image = document.querySelector('#blinds');

/* is speechSynthesis present in window */
if('speechSynthesis' in window) {
	supportmsg.innerHTML = 'Your browser supports speech synthesis';
} else {
	supportmsg.innerHTML = 'Sorry but your browser does not support speech synthesis';
}

import { populateVoices, speak, toggle, playAudio, stopAudio } from './modules/textToSpeech';

image.addEventListener('mouseenter', playAudio);
image.addEventListener('mouseleave', stopAudio);

window.speechSynthesis.addEventListener('onvoiceschanged', populateVoices);

/* or can do toggle.bind(null, false). with bind, you take a function, call it in the context of null, and pass it an argument of false. That's so that toggle(false) does not automatically run on page load. */
stopButton.addEventListener('click', () => toggle(false));
