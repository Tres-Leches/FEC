/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import RelatedCarousel from './RelatedCarousel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
    };

    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (product !== prevProps.product) {
      this.getRelatedProducts();
    }
  }

  getRelatedProducts() {
    const { productId, product } = this.props;
    axios.get(`/api/products/${productId}/related`)
      .then((resp) => {
        resp.data.forEach((relatedProduct) => {
          axios.get(`/api/products/${relatedProduct}/styles`)
            .then((res) => {
              const productStyles = res.data;
              productStyles.name = product.name;
              productStyles.category = product.category;
              this.setState({ relatedProducts: this.state.relatedProducts.concat(productStyles) });
            });
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { relatedProducts } = this.state;

    return (
      <div className="related-main">
        <div className="related-title">RELATED PRODUCTS</div>
        <RelatedCarousel relatedProducts={relatedProducts} />
      </div>
    );
  }
}

export default Main;