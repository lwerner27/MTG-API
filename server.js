// Import required modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');
const cardsController = require("./Controllers/CardsController");
const { object } = require('webidl-conversions');


// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Test controller functions
app.get('/test', (req, res) => {
    cardsController.getAllCardNames()
    res.sendStatus(200)
})

// Testing req.params 
app.get("/test/:cardId", (req, res) => {
    cardsController.getCard(req, res)
})

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