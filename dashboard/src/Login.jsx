import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Link and navigate import
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state between true/false
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
  
      // Save token and logged-in status in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true'); // Set the logged-in status
  
      // Redirect to the /taskboard page after successful login
      navigate('/taskboard');
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data) {
        alert(`Login failed: ${error.response.data.message || 'Invalid email or password'}`);
      } else {
        alert('There was an error during login. Please try again.');
      }
    }
  }

  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1 className="login-heading">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          required
        /><br />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <br />
        <button type="submit">Log In</button>
      </form>

      {/* Signup link */}
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
