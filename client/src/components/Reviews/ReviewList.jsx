import React from 'react';
import axios from 'axios';
import TextSelect from './TextSelect.jsx';
import ReviewTile from './ReviewTile.jsx';
import ReviewModal from './ReviewModal.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewCount: 2,
      reviews: this.props.reviews,
      showModal: false,
      activeSort: 'relevant',
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

  onTextSelectChange(e) {
    this.setState({
      activeSort: e.target.value,
    }, () => (this.props.getReviews(this.state.activeSort)));
  }

  // getReviews() {
  //   axios.get(`/api/reviews/${this.state.reviews.product}`)
  //     .then((res) => (this.setState({ reviews: res.data })));
  // }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal }, () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <div>
          <span>
            {`${this.state.reviews.results.length} reviews, sorted by `}
          </span>
          <span>
            <TextSelect
              options={['Relevant', 'Helpful', 'Newest']}
              active={this.state.activeSort}
              onChange={this.onTextSelectChange}
            />
          </span>
        </div>
        {this.state.reviews.results.slice(0, this.state.reviewCount).map(
          (reviews) => (
            <ReviewTile
              review={reviews}
              key={reviews.review_id}
              getReviews={this.props.getReviews}
              sortBy={this.state.activeSort}
            />
          ),
        )}
        <button
          type="button"
          className="moreReviews"
          onClick={this.handleMoreReviews.bind(this)}
        >
          MORE REVIEWS
        </button>
        <button
          type="button"
          className="addReview"
          onClick={this.toggleModal.bind(this)}
        >
          ADD A REVIEW +
        </button>
        <ReviewModal
          show={this.state.showModal}
          toggleModal={this.toggleModal.bind(this)}
          productId={this.state.reviews.product}
          meta={this.props.meta}
        />
      </div>
    );
  }
}

export default ReviewList;
