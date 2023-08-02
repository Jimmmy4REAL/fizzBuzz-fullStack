import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/login', {
        username,
        password,
      });
      const token = response.data.token;
      // store the token in localStorage for subsequent requests
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      fetchFizzBuzzData(token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
/*
fetch data from the backend API to populate the FizzBuzz result
useEffect hook with an empty dependency array to fetch data on component mount.
displaying format >> the numbers (or 'Fizz', 'Buzz', 'FizzBuzz') in a list
*/
  const fetchFizzBuzzData = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/fizzbuzz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNumbers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    // clear token info and reset the state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setNumbers([]);
  };


return (
    <div className="App">
      <h1>FizzBuzz</h1>
      {isLoggedIn ? (
        <>
          <ul>
            {numbers.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;