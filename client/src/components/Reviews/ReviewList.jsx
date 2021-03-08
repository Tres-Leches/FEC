import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCount: 2,
      reviews: this.props.reviews,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleMoreReviews() {
    this.setState({
      reviewCount: this.state.reviewCount + 2,
    });
  }

  getReviews() {
    axios.get(`/api/reviews/${this.state.reviews.product}`)
      .then((res) => (this.setState({ reviews: res.data })));
  }

  render() {
    return (
      <div>
        <div>{`${this.state.reviews.results.length} reviews, sorted by `}</div>
        {this.state.reviews.results.slice(0, this.state.reviewCount).map(
          (reviews) => (<ReviewTile review={reviews} key={reviews.review_id} getReviews={this.getReviews.bind(this)} />),
        )}
        <button type="button" className="moreReviews" onClick={this.handleMoreReviews.bind(this)}>MORE REVIEWS</button>
        <button type="button" className="addReview">ADD A REVIEW +</button>
      </div>
    );
  }
}

export default ReviewList;
