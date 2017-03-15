/* Creating a Text File for catStory textarea localstorage text for download */
const fileDownloadButton = document.getElementById('save');

export function localStorageToFile() {
	const csv = JSON.stringify(localStorage['autosave']);
	const csvData = `data:application/csv${encodeURIComponent(csv)}`;
	const csvAsBlob = new Blob([csv], { type: 'text/pain' });
	const fileNameToSaveAs = 'local-storage.txt';

	const downloadLink = document.createElement('a');
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = 'Download File';
	if(window.URL !== null) {
		/* Chrome allows the link to be clicked without actually adding it to the DOM */
		downloadLink.href = window.URL.createObjectURL(csvAsBlob);
		downloadLink.target = `_blank`;
	} else {
		downloadLink.href = window.URL.createObjectURL(csvAsBlob);
		downloadLink.target = `_blank`;
		downloadLink.style.display = 'none';
		document.body.appendChild(downloadLink);
		downloadLink.onclick = destroyClickedElement;
	}
	downloadLink.click();
}

export function destroyClickedElement(event) {
/* Remove the link from the DOM */
	document.body.removeChild(event.target);
}
// file download button event listener
fileDownloadButton.addEventListener('click', localStorageToFile);
