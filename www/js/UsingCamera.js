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
        // targetWidth: 100,
        // targetHeight: 100,
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
    blackWhite();
}




function blackWhite() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let image = document.getElementById("imageFile");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image,0,0);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let px = imageData.data;
    let length = px.length;
    for (let i = 0; i < length; i+=4) {
        let redPx   = px[i];
        let greenPx = px[i + 1];
        let bluePx  = px[i + 2];

        let brightness = (redPx + greenPx +  bluePx) / 3;

        if (brightness > 80) {
            px[i]     = 255;
            px[i + 1] = 255;
            px[i + 2] = 255;
            px[i + 3] = 255;
        } else {
            px[i]     = 0;
            px[i + 1] = 0;
            px[i + 2] = 0;
            px[i + 3] = 255;
        }
    }
    ctx.putImageData(imageData,0,0);
}