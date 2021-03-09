import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
import Reviews from './components/Reviews/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '16392',
    };

    this.changeProductId = this.changeProductId.bind(this);
  }

  changeProductId(productId) {
    this.setState({ productId });
  }

  render() {
    const { productId } = this.state;

    return (
      <div>
        <h1> Hello from Apps!</h1>
        <ProductDetail />
        <RelatedItems productId={productId} changeProductId={this.changeProductId} />
        <QuestionsAnswers />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));