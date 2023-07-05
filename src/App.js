import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://laraveltest220795-d8fc6767e0c3.herokuapp.com/healthcheck');
      const data = await response.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setResponse('Error occurred while fetching data.');
    }
  };

  return (
    <div>
      <h1>API Response:</h1>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
