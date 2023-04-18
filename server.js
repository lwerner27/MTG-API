// Import required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');
const routes = require("./Router")

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders:["Content-Type"]
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup the API router
app.use('/api', routes)

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    try {
      await db.connect(process.env.MONGODB_URL);
      console.log(`Server is running on port ${port}`);
    } catch (error) {
      console.error('Error starting server:', error);
    }
  });