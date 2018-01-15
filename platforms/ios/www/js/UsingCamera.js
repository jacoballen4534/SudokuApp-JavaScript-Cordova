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


function openCamera(cam) {

    let srcType;
    if (cam === 0) {
        if (!(device.isVirtual && device.platform === "IOS")) {
            srcType = Camera.PictureSourceType.CAMERA;
        } else {
            alert('Sorry, the camera does not work on a iphone simulator');
            srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        }
    } else {
        srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    let options = setOptions(srcType);

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


