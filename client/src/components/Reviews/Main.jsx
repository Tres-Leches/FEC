/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 16392,
      reviews: '',
      metaData: '',
    };
  }

  componentDidMount() {
    axios.get(`/api/reviews/${this.state.productId}`)
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      }).then(() => console.log(this.state)).catch((err) => (console.log(err)));
    axios.get(`/api/reviews/meta/${this.state.productId}`)
      .then((res) => {
        this.setState({
          metaData: res.data,
        });
      }).then(() => console.log(this.state)).catch((err) => (console.log(err)));
  }

  render() {
    if (!this.state.reviews || !this.state.metaData) {
      return (
        <div />
      );
    }
    return (
      <div>
        <div>Ratings &amp; Reviews</div>
        <ReviewList reviews={this.state.reviews} />
      </div>
    );
  }
}

export default Main;
