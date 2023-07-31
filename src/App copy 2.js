import React from 'react';

const App = () => {
  const imageUrl = 'https://d2b44xu9eiwcet.cloudfront.net/uploads/output/images/image_64b64aed8e303mnw32.jpeg?width=775&height=auto';
  const domain = window.location.origin;

  return (
    <div>
      <h1>Hiển thị ảnh từ URL</h1>
      <img src={imageUrl} alt="Logo" />
      <p>{domain}</p>
    </div>
  );
};

export default App;
