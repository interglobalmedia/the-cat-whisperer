/* Creating a Text File for catStory textarea sessionstorage text for download */
const fileDownloadButton = document.getElementById('save')
const catStory = document.querySelector('.sessionstorage').value;

export function sessionStorageToFile() {
	const csv = JSON.stringify(sessionStorage['autosave'])
	const csvAsBlob = new Blob([csv], {type: 'text/plain'})
	const fileNameToSaveAs = 'session-storage.txt'
	/* this way instead of createElement('a') because otherwise won't work in Firefox. Only Safari and Chrome. */
	const downloadLink = document.getElementById('save')
	downloadLink.download = fileNameToSaveAs
	if (window.URL !== null) {
		/* Chrome allows the link to be clicked without actually adding it to the DOM */
		downloadLink.href = window.URL.createObjectURL(csvAsBlob)
		/* so that opens in separate window in Safari. Then save file as .txt on desktop or wherever. Does not show up in downloads however. But that is usually how Safari works. Better UX with separate window. Can also save to an app. I save the file to Wunderlist. All text shows up. Just emojis show up as plain text in Safari mobile. Can be changed to whatever in app in which text file is stored. */
		downloadLink.target = '_blank'
	} else {
		downloadLink.href = window.URL.createObjectURL(csvAsBlob)
		downloadLink.target = '_blank'
		downloadLink.style.display = 'none'
		// add .download so works in Firefox desktop.
		document.body.appendChild(downloadLink.download)

	}
}

// file download button event listener
fileDownloadButton.addEventListener('click', sessionStorageToFile)
