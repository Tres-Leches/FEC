const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send('Hello GET');
  })
  .post((req, res) => {
    res.send('Hello POST');
  });

module.exports = router;
