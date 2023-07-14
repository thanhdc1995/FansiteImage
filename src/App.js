import React from 'react';

const App = () => {
  const imageUrl = 'https://3guqoe5p0l.execute-api.us-west-2.amazonaws.com/checker';
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
