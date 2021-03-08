import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import { faCheck, faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulClicked: false,
      reported: false,
    };
  }

  onHelpfulClick() {
    axios.put(`api/reviews/${this.props.review.review_id}/helpful`)
      .then(() => {
        this.setState({helpfulClicked: true});
        this.props.getReviews();
      });
  }

  onReportClick() {
    axios.put(`api/reviews/${this.props.review.review_id}/report`)
      .then(() => {
        this.setState({reported: true});
        this.props.getReviews();
      });
  }

  render() {
    return (
      <div>
        <Rating
          initialRating={this.props.review.rating}
          fractions={4}
          readonly
          emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
          fullSymbol={<FontAwesomeIcon icon={fullStar} />}
        />
        <span className="userDateWrapper">
          <span className="reviewUser">{`${this.props.review.reviewer_name}, `}</span>
          <span className="reviewDate">{this.props.review.date.slice(0, 10)}</span>
        </span>
        <div className="reviewSummary">{this.props.review.summary}</div>
        <div className="reviewBody">{this.props.review.body}</div>
        <span className="reviewRecommend">
          {this.props.review.recommend ? (
            <span>
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              I recommend this product
            </span>
          ) : null}
        </span>
        <div>
          <span>Helpful? </span>
          <button
            style={{ textDecoration: 'underline' }}
            type="button"
            disabled={this.state.helpfulClicked}
            onClick={this.onHelpfulClick.bind(this)}
          >
            Yes
          </button>
          <span>{`(${this.props.review.helpfulness})`}</span>
          <span className="textDivider"> | </span>
          <button
            type="button"
            style={{ textDecoration: 'underline' }}
            disabled={this.state.reported}
            onClick={this.onReportClick.bind(this)}
          >
            Report
          </button>
        </div>
      </div>
    );
  }
}
export default ReviewTile;
