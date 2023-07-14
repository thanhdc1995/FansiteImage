// import React from 'react';

// const App = () => {
//   const imageUrl = 'https://d2zn0b5zde5714.cloudfront.net/logo.png';
//   const domain = window.location.origin;

//   return (
//     <div>
//       <h1>Hiển thị ảnh từ URL</h1>
//       <img src={imageUrl} alt="Logo" />
//       <p>{domain}</p>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://3guqoe5p0l.execute-api.us-west-2.amazonaws.com/checker');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <h2>API Response:</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
