import React, { useEffect, useState } from 'react';

const ImageComponent = () => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Gọi API để lấy URL của hình ảnh
    fetch('https://d2zn0b5zde5714.cloudfront.net/logo.png')
      .then(response => response.text())
      .then(data => {
        setImageURL(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {imageURL && <img src={imageURL} alt="Logo" />}
    </div>
  );
};

export default ImageComponent;
