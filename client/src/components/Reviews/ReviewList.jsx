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

  static getDerivedStateFromProps(props, state) {
    if (props.reviews !== state.reviews) {
      return { reviews: props.reviews };
    }
    return null;
  }

  componentDidMount() {
    console.log(this.props.reviews);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviews !== this.props.reviews) {
      this.setState({
        reviews: this.props.reviews
      }, () => console.log('ReviewList Props', this.props.reviews));
    }
  }

  handleMoreReviews() {
    this.setState({
      reviewCount: this.state.reviewCount + 2,
    });
  }

  onTextSelectChange(e) {
    this.setState({
      activeSort: e.target.value,
    }, () => {
      console.log(this.state);
      this.props.getReviews(this.state.activeSort);
      this.forceUpdate();
    });
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
      <div className="reviewList">
        <div>
          <span>
            {this.state.reviews.results.length}
            {' '}
            reviews, sorted by
            <TextSelect
              options={['relevant', 'helpful', 'newest']}
              active={this.state.activeSort}
              onTextSelectChange={this.onTextSelectChange.bind(this)}
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
