const express = require('express');
const options = require('./config');
const axios = require('axios');

const router = express.Router();

router
  .route('/products')
  .get((req, res) => {
    axios.get('/products', options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

router
  .route('/products/:id')
  .get((req, res) => {
    const productId = req.params.id;
    axios.get(`/products/${productId}`, options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

router
  .route('/products/:id/styles')
  .get((req, res) => {
    const productId = req.params.id;
    axios.get(`/products/${productId}/styles`, options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

router
  .route('/reviews/:id')
  .get((req, res) => {
    const productId = req.params.id;
    options.params = {
      product_id: productId,
    };
    axios.get('/reviews', options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

router.route('/reviews')
  .post((req, res) => {
  //   let params = {
  //     "product_id": 16154,
  //     "rating": 5,
  //     "summary": "Very good",
  //     "body": "body ody ody ody",
  //     "recommended": true,
  //     "name": "tres-leches",
  //     "email": "tres-leches@hackreactor.com"
  // }
    axios.post('/reviews', req.body, options)
      .then(() => {
        res.status(201).send('posted');
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

router
  .route('/reviews/meta/:id')
  .get((req, res) => {
    const productId = req.params.id;
    options.params = {
      product_id: productId,
    };
    axios.get('/reviews/meta', options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

module.exports = router;
