/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from './ProductCard';
import './relateditems.css';

const style = {
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

const RelatedCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { relatedProducts, changeProductId, isDark } = props;
  const chevronWidth = 40;

  return (
    <div>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<button style={style.button}>{'<'}</button>}
        rightChevron={<button style={style.button}>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            changeProductId={changeProductId}
            isDark={isDark}
          />
        ))}
      </ItemsCarousel>
    </div>
  );
};

export default RelatedCarousel;
