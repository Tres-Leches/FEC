/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './relateditems.css';

const RelatedCarousel = (props) => {
  const [index, setIndex] = useState(0);
  const { relatedProducts } = props;

  return (
    <Carousel>
      {relatedProducts.map((product) => (
        <Carousel.Item key={product.product_id}>
          <img
            className="card"
            src={product.results[0].photos[0].thumbnail_url}
            alt={product.product_id}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RelatedCarousel;
