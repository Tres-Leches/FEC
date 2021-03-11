import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
import Reviews from './components/Reviews/Main';
import Interactions from './Interactions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '16392',
      product: null,
    };
    this.changeProductId = this.changeProductId.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.postClick = this.postClick.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    axios.get(`/api/products/${this.state.productId}`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((err) => console.error(err));
  }

  changeProductId(productId) {
    this.setState({ productId }, () => {
      this.getProduct();
    });
  }

  postClick(element, widget, time) {
    axios.post('/api/interactions',{element, widget, time})
    .then(()=> console.log("posted click"))
    .catch(err => console.error(err))
  }

  render() {
    const { productId, product } = this.state;

    return (
      <div>
        <h1> Hello from Apps!</h1>
        <Interactions render={(postClick) => (
          <React.Fragment>
            <ProductDetail
              productId={productId}
              product={product}
              onClick={(e) => {postClick(e, "Product Detail")}}
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
          </React.Fragment>
          )}>
        </Interactions>

      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
