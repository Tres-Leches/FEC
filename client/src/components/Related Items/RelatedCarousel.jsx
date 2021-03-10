/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from './ProductCard';
import './relateditems.css';

const RelatedCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { relatedProducts } = props;
  const chevronWidth = 40;

  return (
    <div>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        chevronWidth={chevronWidth}
      >
        {relatedProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default RelatedCarousel;
