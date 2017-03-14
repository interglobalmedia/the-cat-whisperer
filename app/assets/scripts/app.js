import $ from 'jquery';
/* Speech Synthesis */
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
/* localstorage */
// grab textarea for local storage
const catStory = document.querySelector('.localstorage');
const clearStorageButton = document.querySelector('.clear');
const emptyStorageButton = document.querySelector('.empty');
const storagequotamsg = document.getElementById('storagequota-msg');

/* is speechSynthesis present in window */
if('speechSynthesis' in window) {
	supportmsg.innerHTML = 'Your browser supports speech synthesis';
} else {
	supportmsg.innerHTML = 'Sorry but your browser does not support speech synthesis';
}

import { populateVoices, speak, toggle, playAudio, stopAudio, localStorageSupport } from './modules/textToSpeech';

// local storage
// run detection with inverted expression
if(!localStorageSupport) {
	// change value to inform visitor of no local storage support
	storagequotamsg.innerHTML = 'Sorry. No HTML5 local storage support here.';
} else {
	try {
		// set interval and autosave every second
		setInterval(() => {
			localStorage.setItem('autosave', catStory.value);
		}, 1000);
	} catch(domException) {
		if(domException.name === 'QUOTA_EXCEEDED_ERR' || domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
			storagequotamsg.innerHTML = 'Local Storage Quota Exceeded!';
		}
	}
}

// if there is data available
if(localStorage.getItem('autosave', catStory.value)) {
	// retrieve item
	catStory.value = localStorage.getItem('autosave', catStory.value);
}

import { clearStorage, emptyStorage } from './modules/textToSpeech';

// clear local storage button event listener
clearStorageButton.addEventListener('click', clearStorage);
// empty local storage button event listener
emptyStorageButton.addEventListener('click', emptyStorage);
// end local storage

// audio event listeners
image.addEventListener('mouseenter', playAudio);
image.addEventListener('mouseleave', stopAudio);
// speechSynthesis event listener
window.speechSynthesis.addEventListener('onvoiceschanged', populateVoices);
/* or can do toggle.bind(null, false). with bind, you take a function, call it in the context of null, and pass it an argument of false. That's so that toggle(false) does not automatically run on page load. */
stopButton.addEventListener('click', () => toggle(false));
