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
    options['params'] = {
      product_id: productId,
    };
    console.log(options);
    axios.get('/reviews', options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  })
  .post((req, res) => {
    // let request = {
    //   product_id: req.body.product_id
    // }
    console.log(req.body, typeof req.body);
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
