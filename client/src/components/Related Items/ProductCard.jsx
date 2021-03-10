import React from 'react';
import Card from 'react-bootstrap/Card';

const styles = {
  height: 550,
  width: 100,
  objectFit: 'cover',
};

const ProductCard = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.product.results[0].photos[0].thumbnail_url} style={styles} />
      <Card.Body>
        <Card.Title>CATEGORY</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
