import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetail from './components/Product Detail/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
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
        <QuestionsAnswers />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
