/* Creating a Text File for catStory textarea localstorage text for download */
const fileDownloadButton = document.getElementById('save');

export function localStorageToFile() {
	const csv = JSON.stringify(localStorage['autosave']);
	const csvAsBlob = new Blob([csv], {type: 'text/pain'});
	const fileNameToSaveAs = 'local-storage.txt';
	/* this way instead of createElement('a') because otherwise won't work in Firefox. Only Safari and Chrom. */
	const downloadLink = document.getElementById('save');
	downloadLink.download = fileNameToSaveAs;
	if (window.URL !== null) {
        /* Chrome allows the link to be clicked without actually adding it to the DOM */
		downloadLink.href = window.URL.createObjectURL(csvAsBlob);
        /* so that opens in separate window in Safari. Then save file as .txt on desktop or wherever. Does not show up in downloads however. But that is usually how Safari works. Better UX with separate window. */
		downloadLink.target = `_blank`;
	} else {
		downloadLink.href = window.URL.createObjectURL(csvAsBlob);
		downloadLink.target = `_blank`;
		downloadLink.style.display = 'none';
		// add .download so works in Firefox.
		document.body.appendChild(downloadLink.download);

	}
	downloadLink.click();
}

// file download button event listener
fileDownloadButton.addEventListener('click', localStorageToFile);
