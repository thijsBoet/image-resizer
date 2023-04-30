const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage(e) {
	const file = e.target.files[0];

	if (!isFileImage(file)) {
		alertError(
			'Image is not of type gif, png or jpeg, please select another image.',
		);
		return;
	}

	const image = new Image();
	image.src = URL.createObjectURL(file);
	image.onload = function () {
		heightInput.value = this.height;
		widthInput.value = this.width;
	};

	form.style.display = 'block';
	filename.innerText = file.name;
	outputPath.innerText = path.join(os.homedir(), 'imageresizer');
}

function sendImage(e) {
    e.preventDefault();

    const height = heightInput.value;
    const width = widthInput.value;
    const imgPath = img.files[0].path;

    if (!img.files[0]) {
        alertError('Please upload an image.');
        return;
    }

    if (height === '' || width === '') {
        alertError('Please enter a height and width.');
        return;
    }

    ipcRenderer.send('image:resize', {
        imgPath,
        width,
        height,
    });
}

ipcRenderer.on('image:done', (e, message) => {
    alertSuccess(`Image resized successfully to ${widthInput.value} x ${heightInput.value}.`);
});

function isFileImage(file) {
	const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

	return file && acceptedImageTypes.includes(file['type']);
}

function alertError(message) {
	Toastify.toast({
		text: message,
		duration: 5000,
		close: false,
		style: {
			background: 'red',
			color: 'white',
			textAlign: 'center',
		},
	});
}

function alertSuccess(message) {
	Toastify.toast({
		text: message,
		duration: 5000,
		close: false,
		style: {
			background: 'blue',
			color: 'white',
			textAlign: 'center',
		},
	});
}

img.addEventListener('change', loadImage);
form.addEventListener('submit', e => sendImage(e));
