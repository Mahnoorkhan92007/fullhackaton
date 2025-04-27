import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false); // State for loading indication
  const [errorMessage, setErrorMessage] = useState(''); // State for displaying error messages

  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/taskboard');
    }
  }, [navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state between true/false
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    setErrorMessage(''); // Reset error message

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
      setErrorMessage(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false); // Reset loading state
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button> {/* Display loading state */}
      </form>

      {/* Signup link */}
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
