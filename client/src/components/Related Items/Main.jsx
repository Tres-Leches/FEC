/* eslint-disable class-methods-use-this */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import RelatedCarousel from './RelatedCarousel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { relatedProducts, changeProductId, isDark } = this.props;

    return (
      <div className="related-main">
        <div className="related-title">RELATED PRODUCTS</div>
        <RelatedCarousel
          relatedProducts={relatedProducts}
          changeProductId={changeProductId}
          isDark={isDark}
        />
      </div>
    );
  }
}

export default Main;

