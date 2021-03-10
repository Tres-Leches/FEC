const express = require('express');
const axios = require('axios');
const options = require('./config.js');

const router = express.Router();
/** ******************* PRODUCTS ROUTES ******************** */

// get all products
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

// get product based on id
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

// get all styles from one product
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
  .route('/products/:id/related')
  .get((req, res) => {
    const productId = req.params.id;
    axios.get(`/products/${productId}/related`, options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

/** ******************* REVIEWS ROUTES ******************** */

// get all reviews from product id
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

// get all specific reviews from product id
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

// post a review
router.route('/reviews')
  .post((req, res) => {
    axios.post('/reviews', req.body, options)
      .then(() => {
        res.status(201).send('posted');
      })
      .catch((err) => {
        if (err.response.status === 500) {
          res.status(201).send('posted');
        } else {
          res.status(404).send(err);
        }
      });
  });

// update specific review to be helpful
router.route('/reviews/:review_id/helpful')
  .put((req, res) => {
    const reviewId = req.params.review_id;
    axios.put(`/reviews/${reviewId}/helpful`, {}, options)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.send(err);
      });
  });

// report specific review
router.route('/reviews/:review_id/report')
  .put((req, res) => {
    const reviewId = req.params.review_id;
    axios.put(`/reviews/${reviewId}/report`, {}, options)
      .then(() => res.status(204).end())
      .catch((err) => res.send(err));
  });

/** ******************* Q&A ROUTES ******************** */
router.route('/qa/questions/:id')
  .get((req, res) => {
    const productId = req.params.id;
    options.params = {
      product_id: productId,
      count: 100,
    };
    axios.get('/qa/questions', options)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    axios.post('/qa/questions', req.body, options)
      .then(() => res.status(201).send('posted'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/answers')
  .get((req, res) => {
    const questionId = req.params.question_id;
    axios.get(`/qa/questions/${questionId}/answers`, options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    const questionId = req.params.question_id;
    axios.post(`/qa/questions/${questionId}/answers`, req.body, options)
      .then(() => res.status(201).send('posted'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/helpful')
  .put((req, res) => {
    const questionId = req.params.question_id;
    axios.put(`/qa/questions/${questionId}/helpful`, {}, options)
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/questions/:question_id/report')
  .put((req, res) => {
    const questionId = req.params.question_id;
    axios.put(`/qa/questions/${questionId}/report`, {}, options)
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/answers/:answer_id/helpful')
  .put((req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`/qa/answers/${answerId}/helpful`, {}, options)
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/qa/answers/:answer_id/report')
  .put((req, res) => {
    const answerId = req.params.answer_id;
    axios.put(`/qa/answers/${answerId}/report`, {}, options)
      .then(() => res.status(204).send('updated'))
      .catch((err) => res.send(err));
  });

router.route('/interactions')
  .post((req, res) => {
    axios.post('/interactions', req.body, options)
    .then(() => res.status(201).send('posted'))
    .catch((err) => res.send(err));
  })

module.exports = router;
