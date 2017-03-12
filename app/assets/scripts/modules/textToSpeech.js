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

if('speechSynthesis' in window) {
	supportmsg.innerHTML = 'Your browser supports speech synthesis';
} else {
	supportmsg.innerHTML = 'Sorry but your browser does not support speech synthesis';
}

/* populates all the voices available in Speech Synthesis in the dropdown menu */
export function populateVoices() {
	const voices = speechSynthesis.getVoices();
	const voiceOptions =
	voices.forEach((voice, indx) => {
		/* this will create the option tag for the various voices in the select dropdown */
		const option = document.createElement('option');
		/* links the option value (voice) with the voice name */
		option.value = voice.name;
		/* displays the name of the voice in the select dropdown */
		option.innerHTML = voice.name;
		voiceSelect.appendChild(option);
	});
}

// sets text to speech
export function speak(text) {
	/* instead of previous global variable. When I made changes, it ended up undefined. */
	const msg = new SpeechSynthesisUtterance();
	const voices = speechSynthesis.getVoices();
	/* sets value of msg.text property as text for text to speech */
	msg.text = text;
	/* sets value of msg.volume property as volume for text to speech */
	msg.volume = parseFloat(volumeInput.value);
	/* sets value of msg.rate property as speed rate for text to speech */
	msg.rate = parseFloat(rateInput.value);
	/* sets value of msg.pitch property as pitch for text to speech */
	msg.pitch = parseFloat(pitchInput.value);
	/* determine whether there is a <select> value present (voice) */
	if(voiceSelect.value) {
		/* the value of the msg.voice property is set to the first voice in the dropdown */
		msg.voice = voices.filter((voice) => voice.name === voiceSelect.value)[0];
	}
	/* attach speak(msg) to speechSynthesis in window */
	window.speechSynthesis.speak(msg);
}

// toggle speechSynthesis on/off
export function toggle(startOver = true) {
	const msg = new SpeechSynthesisUtterance();
	speechSynthesis.cancel();
	if(startOver) {
		speechSynthesis.speak(msg);
	}
}

export function playAudio() {
	audio.play();
}

export function stopAudio() {
	audio.pause();
}

image.addEventListener('mouseenter', playAudio);
image.addEventListener('mouseleave', stopAudio);
/* need explicit call to populateVoices() for Firefox and Safari. Happens after onvoiceschanged event returns populateVoices(); */
populateVoices();
/* when there is a change in voice selection, make a call to populateVoices(); This replaces the original speechSynthesis.addEventListener('voiceschanged', populatePopulateVoices). Because Safari was not able to evaluate it. */
window.speechSynthesis.onvoiceschanged = (e) => populateVoices();
/* event listener for speak (start) button. If there is a voice to select and it is selected, trigger text to speech. */
speakButton.addEventListener('click', (e) => {
	/* determine whether a voice has been selected, and if it has, click on button to trigger speak(); */
	if(voiceSelect.value.length > 0) {
		speak(speechMsgText.value);
	}
});
/* or can do toggle.bind(null, false). with bind, you take a function, call it in the context of null, and pass it an argument of false. That's so that toggle(false) does not automatically run on page load. */
stopButton.addEventListener('click', () => toggle(false));
