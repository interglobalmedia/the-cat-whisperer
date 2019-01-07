
/* Speech Synthesis */
const supportmsg = document.getElementById('support-msg')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')
const speechMsgText = document.querySelector('[name="text"]')
const voiceSelect = document.querySelector('#voice')
let volumeInput = document.querySelector('[name="volume"]')
let rateInput = document.querySelector('[name="rate"]')
let pitchInput = document.querySelector('[name="pitch"]')
const PowerAnimals = require('../audio/06-Power-Animals.mp3');
const audio = new Audio(PowerAnimals);
// audio play/pause buttons
const play = document.querySelector('.play')
const pause = document.querySelector('.pause')

const image = document.querySelector('#blinds span')
/* localstorage */
const catStory = document.querySelector('.localstorage')
const clearStorageButton = document.querySelector('.clear')
const emptyStorageButton = document.querySelector('.empty')
const storagequotamsg = document.getElementById('storagequota-msg')

if('speechSynthesis' in window) {
	supportmsg.innerHTML = 'Your browser supports speech synthesis'
} else {
	supportmsg.innerHTML = 'Sorry but your browser does not support speech synthesis'
}

/* populates all the voices available in Speech Synthesis in the dropdown menu */
export function populateVoices() {
	const voices = speechSynthesis.getVoices()
	const voiceOptions =
	voices.forEach((voice, indx) => {
		/* this will create the option tag for the various voices in the select dropdown */
		const option = document.createElement('option')
		/* links the option value (voice) with the voice name */
		option.value = voice.name
		/* displays the name of the voice in the select dropdown */
		option.innerHTML = voice.name
		voiceSelect.appendChild(option)
	})
}

// sets text to speech
export function speak(text) {
	/* instead of previous global variable. When I made changes, it ended up undefined. */
	const msg = new SpeechSynthesisUtterance()
	const voices = speechSynthesis.getVoices()
	/* sets value of msg.text property as text for text to speech */
	msg.text = text
	/* sets value of msg.volume property as volume for text to speech */
	msg.volume = parseFloat(volumeInput.value)
	/* sets value of msg.rate property as speed rate for text to speech */
	msg.rate = parseFloat(rateInput.value)
	/* sets value of msg.pitch property as pitch for text to speech */
	msg.pitch = parseFloat(pitchInput.value)
	/* determine whether there is a <select> value present (voice) */
	if(voiceSelect.value) {
		/* the value of the msg.voice property is set to the first voice in the dropdown */
		msg.voice = voices.filter((voice) => voice.name === voiceSelect.value)[0]
	}
	/* attach speak(msg) to speechSynthesis in window */
	window.speechSynthesis.speak(msg)
}

// toggle speechSynthesis on/off
export function toggle(startOver = true) {
	const msg = new SpeechSynthesisUtterance()
	speechSynthesis.cancel()
	if(startOver) {
		speechSynthesis.speak(msg)
	}
}
// play music
export function playAudio() {
	audio.play('../audio/06-Power-Animals.mp3')
}

// stop music
export function stopAudio() {
	audio.pause('../audio/06-Power-Animals.mp3')
}

// check for local storage
export function localStorageSupport() {
	return typeof(Storage) !== 'undefined'
}

// run detection with inverted expression
if(!localStorageSupport) {
	// change value to inform visitor of no local storage support
	storagequotamsg.innerHTML = 'Sorry. No HTML5 local storage support here.'
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
	catStory.value = localStorage.getItem('autosave', catStory.value)
} else {
	localStorage.setItem('autosave', catStory.value);
}

// clear local storage
export function clearStorage() {
	catStory.value = ''
	localStorage.removeItem('autosave', catStory.value)
}
// empty local storage
export function emptyStorage() {
	catStory.value = ''
	localStorage.clear()
}

// play/pause audio button event listeners
play.addEventListener('click', playAudio)
pause.addEventListener('click', stopAudio)

// clear local storage button event listener
clearStorageButton.addEventListener('click', clearStorage)
// empty local storage button event listener
emptyStorageButton.addEventListener('click', emptyStorage)
// audio event listeners
image.addEventListener('mouseenter', playAudio)
image.addEventListener('mouseleave', stopAudio)
/* need explicit call to populateVoices() for Firefox and Safari. Happens after onvoiceschanged event returns populateVoices(); */
populateVoices()
/* When there is a change in voice selection, make a call to populateVoices(); This replaces the original speechSynthesis.addEventListener('voiceschanged', populatePopulateVoices). Because Safari was not able to evaluate it.
This along with explicit call to populateVoices(). Removed call to speechSynthesis on window because it works without being placed in app.js, or so it seems. It also means that the error in Safari console no longer shows up. This must be because it is call to window, and therefore is picked up everywhere (which it is, ie if several browser windows are open at same time). */
//window.speechSynthesis.addEventListener('onvoiceschanged', populateVoices);
window.speechSynthesis.onvoiceschanged = (e) => populateVoices()
/* event listener for speak (start) button. If there is a voice to select and it is selected, trigger text to speech.
Not necessary when application set in workflow. Only toggle() function needed. */
speakButton.addEventListener('click', (e) => {
	/* determine whether a voice has been selected, and if it has, click on button to trigger speak(); */
	if(voiceSelect.value.length > 0) {
		speak(speechMsgText.value)
	}
})
/* or can do toggle.bind(null, false). with bind, you take a function, call it in the context of null, and pass it an argument of false. That's so that toggle(false) does not automatically run on page load. */
stopButton.addEventListener('click', () => toggle(false))
