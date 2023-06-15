import React, { useState } from 'react';
import EXIF from 'exif-js';

const ImageInfoExif = () => {
  const [exifData, setExifData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        EXIF.getData(image, () => {
          const exifInfo = EXIF.getAllTags(image);
          setExifData(exifInfo);
        });
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {exifData && (
        <div>
          <h2>EXIF Data:</h2>
          <pre>{JSON.stringify(exifData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageInfoExif;
