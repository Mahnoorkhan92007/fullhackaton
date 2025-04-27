const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const helmet = require('helmet');  // Optional: to enhance security with HTTP headers
const User = require('./models/user');
const connectDB = require('./mongoconfig/db');

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// JWT Secret from the .env file
const jwtSecret = process.env.JWT_SECRET;

// Ensure that the JWT secret exists
if (!jwtSecret) {
  console.error("JWT_SECRET is not defined in your .env file!");
  process.exit(1);  // Exit the process if JWT_SECRET is not found
}

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // React (Vite) frontend port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for enhanced security
app.use(helmet());  // Adds security-related HTTP headers

// Logging middleware
app.use(morgan('dev'));

// Middleware to parse JSON requests
app.use(express.json());

// Simple Route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  console.log("Received signup request", req.body);
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving to the DB
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create JWT token using the secret from the .env file
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token using the secret from the .env file
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
