import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log('Login successful:', response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Error logging in:', error);
      // Display error message to user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {/* Add Link to Register page */}
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginForm;
