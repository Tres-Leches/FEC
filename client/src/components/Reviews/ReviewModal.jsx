import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './Reviews.css';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const schema = yup.object().shape({
  summary: yup.string().max(60),
  body: yup.string().required().min(50).max(1000),
  nickname: yup.string().required().max(50),
  email: yup.string().required().max(60).email(),
});

class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta:this.props.meta,
      rating: 0,
      recommend: true,

    };
  }

  onRatingClick(value) {
    let str = '';
    switch (value) {
      case 1:
        str = 'Poor';
        break;
      case 2:
        str = 'Fair';
        break;
      case 3:
        str = 'Average';
        break;
      case 4:
        str = 'Good';
        break;
      case 5:
        str = 'Great';
        break;
      default:
        str = '';
        break;
    }
    this.setState({ rating: value, ratingStr: str });
  }

  onRadioChange(e) {
    this.setState({recommend: JSON.parse(e.target.value)}, () => console.log(this.state));
  }

  render() {
    if (!this.props.show) {
      return (null);
    }
    return (
      <div className="reviewModal">
        <div className="reviewModal-content">
          <div className="reviewModal-header">
            <h2>Write Your Review</h2>
            <div>About the product name</div>
            <span
              className="close"
              role="button"
              tabIndex={0}
              onClick={this.props.toggleModal}
              onKeyDown={this.props.toggleModal}
            >
              &times;
            </span>
          </div>
          <form>
            <div className="reviewModal-rating">
              <Rating
                initialRating={this.state.rating}
                emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
                fullSymbol={<FontAwesomeIcon icon={fullStar} />}
                value={this.state.rating}
                onClick={this.onRatingClick.bind(this)}
              />
              <span>
                {this.state.ratingStr}
              </span>
              <div className="reviewModal-recommend" onChange={this.onRadioChange.bind(this)}>
                <div>Do you recommend this product?</div>
                <input
                  type="radio"
                  value="true"
                  name="recommend"
                  defaultChecked
                />
                Yes
                <input
                  type="radio"
                  value="false"
                  name="recommend"
                />
                No
              </div>
              <div className="reviewModal-characteristics">
                {this.state.meta.keys.map((char) => {
                  <CharateristicRadio charName={char} data={this.state.meta[char]} />;
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewModal;
