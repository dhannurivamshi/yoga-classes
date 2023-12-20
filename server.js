 // server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { validateUserData } = require('./valid');

const app = express();
const PORT = process.env.PORT || 5005;

// Connection URL - Replace with your MongoDB connection string
const dbUrl = 'mongodb://127.0.0.1:27017/yogaClasses';

// Connect to MongoDB without useNewUrlParser and useUnifiedTopology options
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

// Define the schema for the database
const participantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  selectedBatch: String,
});

const Participant = mongoose.model('participants', participantSchema);

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Mock function to simulate a payment of Rs500
const completePayment = (userId) => {
  // In a real scenario, you would integrate with a payment gateway here
  console.log(`Payment of Rs500 completed for user with ID: ${userId}`);
};

// Example route to handle user registration and payment
app.post('/register', async (req, res) => {
  // Validate user data
  const validationErrors = validateUserData(req.body);

  if (validationErrors.length > 0) {
    // Return validation errors
    return res.status(400).json({ errors: validationErrors });
  }

  // Process user registration (create user in the database, etc.)
  try {
    const newUser = await User.create(req.body);

    // Simulate a payment of Rs500
    completePayment(newUser._id);

    res.json({ message: 'User registered successfully', user: newUser });

    // Clear user data after successful registration
    // Note: You might want to clear sensitive data before sending the response
    req.body.username = '';
    req.body.password = '';

    // You can also redirect to a success page or display a success message on the front end
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});