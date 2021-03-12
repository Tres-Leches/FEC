/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import MetaData from './MetaData.jsx';

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
    Promise.all([
      axios.get(`/api/reviews/${this.state.productId}/relevant`),
      axios.get(`/api/reviews/meta/${this.state.productId}`),
    ]).then(([res1, res2]) => {
      this.setState({
        reviews: res1.data,
        metaData: res2.data,
      }, () => console.log(this.state));
    });
    // axios.get(`/api/reviews/${this.state.productId}/relevant`)
    //   .then((res) => {
    //     this.setState({
    //       reviews: res.data,
    //     });
    //   }).then(() => console.log(this.state)).catch((err) => (console.log(err)));
    // axios.get(`/api/reviews/meta/${this.state.productId}`)
    //   .then((res) => {
    //     this.setState({
    //       metaData: res.data,
    //     });
    //   }).then(() => console.log(this.state)).catch((err) => (console.log(err)));
  }

  getReviews(sort) {
    axios.get(`/api/reviews/${this.state.productId}/${sort}`)
      .then((res) => {
        this.setState({
          reviews: res.data,
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
        <MetaData metaData={this.state.metaData} />
        <ReviewList
          reviews={this.state.reviews}
          meta={this.state.metaData}
          getReviews={this.getReviews.bind(this)}
        />
      </div>
    );
  }
}

export default Main;
