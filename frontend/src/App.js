import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetchFizzBuzzData();
  }, []);
/*
fetch data from the backend API to populate the FizzBuzz result
useEffect hook with an empty dependency array to fetch data on component mount.
displaying format >> the numbers (or 'Fizz', 'Buzz', 'FizzBuzz') in a list
*/
  const fetchFizzBuzzData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/fizzbuzz');
      const data = await response.json();
      setNumbers(data);
    } catch (error) {
      console.error('error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>FizzBuzz</h1>
      <ul>
        {numbers.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
