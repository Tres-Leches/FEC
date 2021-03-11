/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const styles = {
  cardImg: {
    height: '300px',
    width: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  cardTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bolder',
    fontSize: '1rem',
    marginBottom: '0',
  },
  cardText: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    marginBottom: '0',
  },
};

const ProductCard = (props) => {
  const { product, changeProductId } = props;

  return (
    <Card style={{ height: '450px' }}>
      <Card.Img variant="top" src={product.results[0].photos[0].thumbnail_url} style={styles.cardImg} onClick={() => changeProductId(product.product_id)}/>
      <Card.Body style={{ height: '30%' }}>
        <Card.Text style={styles.cardText}>{product.category}</Card.Text>
        <Card.Text style={styles.cardTitle}>{product.name}</Card.Text>
        <Card.Text style={styles.cardText}>${product.default_price}</Card.Text>
        <Card.Text>
          <Rating
            initialRating={product.rating}
            fractions={4}
            readonly
            emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
            fullSymbol={<FontAwesomeIcon icon={fullStar} />}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
