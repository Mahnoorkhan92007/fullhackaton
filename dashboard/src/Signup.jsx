import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email) {
      alert("Email is required!");
      return;
    }
  
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('User created successfully:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error occurred during signup:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message || 'An unknown error occurred'}`);
      } else {
        alert('There was an error during signup. Please try again.');
      }
  

    }
  };

  return (
    <div className='Whole'>     
      <form onSubmit={handleSubmit}>
        <h1 className='signup'>SIGNUP</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Enter your Name'
             autoComplete="username"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete='email'
            placeholder='Enter your Email'
            required
          />
        </div>
        <div style={{ position: 'relative' }}>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
            placeholder='Enter your Password'
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Signup;
