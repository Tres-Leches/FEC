import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
import Reviews from './components/Reviews/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '16392',
      product: null,
    };

    this.changeProductId = this.changeProductId.bind(this);
  }

  getProduct() {
    axios.get(`/api/products/${this.state.product_id}`)
      .then((response) => {
        this.setState({product: response.data});
      })
      .catch((err) => console.error(err));
  }

  changeProductId(productId) {
    this.setState({ productId });
  }

  render() {
    const { productId, product } = this.state;

    return (
      <div>
        <h1> Hello from Apps!</h1>
        <ProductDetail
          productId={productId}
          product={product}
        />
        <RelatedItems
          productId={productId}
          product={product}
          changeProductId={this.changeProductId}
        />
        <QuestionsAnswers
          productId={productId}
        />
        <Reviews
          productId={productId}
          product={product}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
