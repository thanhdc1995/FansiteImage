import React from 'react';

const App = () => {
  const imageUrl = 'https://d2zn0b5zde5714.cloudfront.net/logo.png';
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
