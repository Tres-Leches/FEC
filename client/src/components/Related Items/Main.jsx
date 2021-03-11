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
    this.state = {
      relatedProducts: [],
    };

    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (product !== prevProps.product) {
      this.getRelatedProducts();
    }
  }

  getRelatedProducts() {
    const { productId } = this.props;
    axios.get(`/api/products/${productId}/related`)
      .then((response) => {
        response.data.forEach((relatedProduct) => {
          this.getRating(relatedProduct)
            .then((rating) => {
              axios.get(`/api/products/${relatedProduct}`)
                .then((resp) => resp.data)
                .then((product) => {
                  axios.get(`/api/products/${relatedProduct}/styles`)
                    .then((res) => {
                      const productStyles = res.data;
                      productStyles.name = product.name;
                      productStyles.category = product.category;
                      productStyles.default_price = product.default_price;
                      productStyles.rating = rating;
                      this.setState({
                        relatedProducts: this.state.relatedProducts.concat(productStyles),
                      });
                    });
                });
            });
        });
      })
      .catch((err) => console.error(err));
  }

  getRating(productId) {
    return axios.get(`/api/reviews/meta/${productId}`)
      .then((response) => {
        let count = 0;
        let total = 0;
        for (let rating in response.data.ratings) {
          count += Number(response.data.ratings[rating]);
          total += Number(rating) * Number(response.data.ratings[rating])
        }
        const calcRating = (Math.round(total / count * 4) / 4).toFixed(2);
        return calcRating;
      });
  }

  render() {
    const { relatedProducts } = this.state;
    const { changeProductId } = this.props;

    return (
      <div className="related-main">
        <div className="related-title">RELATED PRODUCTS</div>
        <RelatedCarousel relatedProducts={relatedProducts} changeProductId={changeProductId} />
      </div>
    );
  }
}

export default Main;
