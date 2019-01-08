import './styles.scss';

/* Speech Synthesis */
const supportmsg = document.getElementById('support-msg');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const speechMsgText = document.querySelector('[name="text"]');
const voiceSelect = document.querySelector('#voice');
let volumeInput = document.querySelector('[name="volume"]');
let rateInput = document.querySelector('[name="rate"]');
let pitchInput = document.querySelector('[name="pitch"]');
const audio = new Audio('./audio/06-Power-Animals.mp3');
// audio play/pause buttons
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');

const image = document.querySelector('#blinds');
/* sessionstorage */
// grab textarea for session storage
const catStory = document.querySelector('.sessionstorage');
const clearStorageButton = document.querySelector('.clear');
const emptyStorageButton = document.querySelector('.empty');
const storagequotamsg = document.getElementById('storagequota-msg');

/* For creating a text File for catStory textarea sessionstorage text for download */
const fileDownloadButton = document.getElementById('save');

/* sessionstorage text to downloadable file related */
import { sessionStorageToFile } from './modules/catStoryText';
/* fileDownloadButton event listener */
fileDownloadButton.addEventListener('click', sessionStorageToFile);

/* is speechSynthesis present in window */
if('speechSynthesis' in window) {
	supportmsg.innerHTML = 'Your browser supports speech synthesis';
} else {
	supportmsg.innerHTML = 'Sorry but your browser does not support speech synthesis';
}

import { populateVoices, speak, toggle, playAudio, stopAudio, sessionStorageSupport } from './modules/textToSpeech';

// session storage
// run detection with inverted expression
if(!sessionStorageSupport) {
	// change value to inform visitor of no session storage support
	storagequotamsg.innerHTML = 'Sorry. No HTML5 session storage support here.';
} else {
	try {
        // set interval and autosave every second
		setInterval(() => {
			sessionStorage.setItem('autosave', catStory.value);
		}, 1000);
	} catch(domException) {
		if(domException.name === 'QUOTA_EXCEEDED_ERR' || domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
			storagequotamsg.innerHTML = 'Session Storage Quota Exceeded!';
		}
	}
}

// if there is data available
if(sessionStorage.getItem('autosave', catStory.value)) {
	// retrieve item
	catStory.value = sessionStorage.getItem('autosave', catStory.value);
}

import { clearStorage, emptyStorage } from './modules/textToSpeech';

// play/pause audio button event listeners
play.addEventListener('click', playAudio);
pause.addEventListener('click', stopAudio);
// clear session storage button event listener
clearStorageButton.addEventListener('click', clearStorage);
// empty session storage button event listener
emptyStorageButton.addEventListener('click', emptyStorage);
// end session storage

// audio event listeners on laptop/desktop
image.addEventListener('mouseenter', playAudio);
image.addEventListener('mouseleave', stopAudio);
// audio event listeners on mobile/touch devices
play.addEventListener('click', playAudio);
pause.addEventListener('click', stopAudio);
/* or can do toggle.bind(null, false). with bind, you take a function, call it in the context of null, and pass it an argument of false. That's so that toggle(false) does not automatically run on page load. */
stopButton.addEventListener('click', () => toggle(false));