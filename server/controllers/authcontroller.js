const EmployeeModel = require('../models/user');  // Ensure model is imported correctly
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new EmployeeModel({
      name: fullName,  // Use 'name' as defined in your schema
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
