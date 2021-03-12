import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Product Detail/Header';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
import Reviews from './components/Reviews/Main';
import withTracker from './Interactions';

const HeaderTracker = withTracker(Header, "Header");
const ProductDetailTracker = withTracker(ProductDetail, "Product Detail");
const RelatedItemsTracker = withTracker(RelatedItems, "Related Items");
const QuestionsAnswersTracker = withTracker(QuestionsAnswers, "Questions and Answers");
const ReviewsTracker = withTracker(Reviews, "Reviews");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '16060',
      product: null,
    };
    this.changeProductId = this.changeProductId.bind(this);
    this.getProduct = this.getProduct.bind(this);
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

  render() {
    const { productId, product } = this.state;

    return (
      <div>
          <React.Fragment>
            <Header />
            <ProductDetailTracker
              productId={productId}
              product={product}
            />
            <RelatedItemsTracker
              productId={productId}
              product={product}
              changeProductId={this.changeProductId}
            />
            <QuestionsAnswersTracker
              productId={productId}
            />
            <ReviewsTracker
              productId={productId}
              product={product}
            />
          </React.Fragment>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
