const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Add strictQuery to avoid deprecation warnings
    mongoose.set('strictQuery', true);

   
    // Connection options (removed deprecated options)
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB with the provided URI and options
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    // Log a successful connection
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log the full error message for debugging
    console.error('Error connecting to MongoDB:', error.message);

    // Exit the process if MongoDB connection fails (for production)
    process.exit(1);
  }
}

module.exports = connectDB;
