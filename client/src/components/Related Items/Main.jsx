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

  componentDidMount() {
    this.getRelatedProducts();
  }

  getRelatedProducts() {
    const { productId } = this.props;
    axios.get(`/api/products/${productId}/related`)
      .then((response) => {
        response.data.forEach((relatedProduct) => {
          axios.get(`/api/products/${relatedProduct}/styles`)
            .then((res) => {
              this.setState({ relatedProducts: this.state.relatedProducts.concat(res.data) });
            });
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { relatedProducts } = this.state;

    return (
      <div>
        Hello from Related Items.
        <RelatedCarousel relatedProducts={relatedProducts} />
      </div>
    );
  }
}

export default Main;
