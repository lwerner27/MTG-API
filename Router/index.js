const express = require('express');
const router = express.Router();
const cardRoutes = require("./Cards")

router.use("/cards", cardRoutes)

router.get('/hello-world', (req, res) => {
  res.send('Hello, World! From the API Page.');
});

module.exports = router;