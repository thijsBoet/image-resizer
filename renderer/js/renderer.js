const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage(e) {
    const file = e.target.files[0];

    if (!isFileImage(file)) {
        alert('Image is not of type gif, png or jpeg, please select another image type.');
        return
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
        heightInput.value = this.height;
        widthInput.value = this.width;
    }

    form.style.display = 'block';
    filename.innerText = file.name;

}

function isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    return file && acceptedImageTypes.includes(file['type']);
}

img.addEventListener('change', loadImage);