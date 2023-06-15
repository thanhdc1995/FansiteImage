import React, { useState } from 'react';
import EXIF from 'exif-js';

const ImageUploader = () => {
  const [editedImage, setEditedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        EXIF.getData(image, () => {
          // Lấy thông tin EXIF
          const exifInfo = EXIF.getAllTags(image);

          // Tạo một bản sao của hình ảnh gốc
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

          // Xóa thông tin EXIF khỏi bản sao
          delete exifInfo.Orientation; // Ví dụ xóa thuộc tính Orientation
          const editedImageDataURL = editedCanvas.toDataURL(file.type);

          // Lưu bản sao đã chỉnh sửa vào state
          setEditedImage(editedImageDataURL);
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement('a');
      link.href = editedImage;
      link.download = 'edited_image.jpg'; // Tên tệp đã chỉnh sửa
      link.click();
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {editedImage && (
        <div>
          <h2>Edited Image:</h2>
          <img src={editedImage} alt="Edited" />
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
