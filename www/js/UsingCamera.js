function setOptions(srcType) {
    let options = {
        // Some common settings are 20, 50, and 100
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        cameraDirection: Camera.Direction.BACK,
        correctOrientation: true,  //Corrects Android orientation quirks
        saveToPhotoAlbum: false
    };
    return options;
}


function openCamera() {

    let srcType = Camera.PictureSourceType.CAMERA;
    let options = setOptions(srcType);
    // let func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        // func(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}


function displayImage(imgUri) {

    let elem = document.getElementById('imageFile');
    elem.src = "data:image/jpeg;base64," +imgUri;
}


// ADD IMPORT FROM LIBRY/GALLERY