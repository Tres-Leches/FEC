import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import Reviews from './components/Reviews/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1> Hello from Apps!</h1>
        <ProductDetail />
        <RelatedItems />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
