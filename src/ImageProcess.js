import EXIF from 'exif-js';

const ImageProcess = function (uploadedImage) {
  if (uploadedImage) {
    const image = new Image();
    image.src = uploadedImage;

    image.onload = () => {
      EXIF.getData(image, () => {
        const exifInfo = EXIF.getAllTags(image);
        if (exifInfo && exifInfo.Orientation) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          const editedCanvas = document.createElement('canvas');
          const editedContext = editedCanvas.getContext('2d');
          editedCanvas.width = image.width;
          editedCanvas.height = image.height;
          editedContext.drawImage(canvas, 0, 0);
          delete exifInfo.Orientation;
          return editedCanvas.toDataURL('image/jpeg');
        }
      });
    };
  }

  return uploadedImage;
};

export default ImageProcess;
