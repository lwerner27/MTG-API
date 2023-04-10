const express = require('express');
const router = express.Router();
const cardsController = require("../Controllers/CardsController")

router.get('/hello-world', (req, res) => {
  res.send('Hello from the cards api.');
});

// Route that gets all Unique Card names:
// Test controller functions
app.get('/test', (req, res) => {
    cardsController.getAllUniqueCardNames(req, res)
})

// Route that gets cards by ID
router.get("/id/:cardId", (req, res) => {
    cardsController.getCard(req, res)
})

module.exports = router;