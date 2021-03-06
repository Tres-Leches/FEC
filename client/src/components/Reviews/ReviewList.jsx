import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCount: 2,
      reviews: this.props.reviews
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {this.state.reviews.slice(0, this.state.reviewCount).map(
          (reviews, index) => (<ReviewTile review={reviews} key={reviews.review_id} />)
        )}
        <button>MORE REVIEWS</button>
        <button>ADD A REVIEW +</button>
      </div>
    );
  }
}

export default ReviewList;
