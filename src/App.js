import React, { useState } from 'react';
import ImageProcess from './ImageProcess';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedImage && (
        <img
        alt="Media Preview"
        src={`${ImageProcess(uploadedImage)}`}
        style={{ width: '300px', height: 'auto' }}
      />
      )}
    </div>
  );
};

export default App;
