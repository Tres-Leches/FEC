import React from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import ProgressBar from './ProgressBar.jsx';
import MultiStepProgressBar from './MultistepProgressBar.jsx';

class MetaData extends React.Component {
  constructor(props) {
    super(props);
    this.totalReviews = parseInt(this.props.metaData.recommended.false) + parseInt(this.props.metaData.recommended.true);
    this.state = {
      meta: this.props.metaData,

      percentRecommend: this.props.metaData.recommended.true / this.totalReviews * 100,

      avgRating: ((this.props.metaData.ratings['1'] * 1) + (this.props.metaData.ratings['2'] * 2) + (this.props.metaData.ratings['3'] * 3) + (this.props.metaData.ratings['4'] * 4) + (this.props.metaData.ratings['5'] * 5)) / this.totalReviews,
    };
  }

  componentDidMount() {
    console.log('metadata', (this.state.meta.characteristics['Comfort'].value));
  }

  render() {
    if (!this.state.meta || !this.state.percentRecommend || !this.state.avgRating) {
      return (
        <div />
      );
    }
    return (
      <div className="metadata">
        <div className="metadata-content">
          <span>Avg Rating</span>
          <Rating
            initialRating={this.state.avgRating.toFixed(2)}
            fractions={4}
            readonly
            emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
            fullSymbol={<FontAwesomeIcon icon={fullStar} />}
          />
        </div>
        <div>
          {`${this.state.percentRecommend.toFixed(0)}% of reviews recommend this product`}
        </div>
        <div>
          {Object.keys(this.state.meta.ratings).map((val, index) => (
            <ProgressBar
              percent={(this.state.meta.ratings[val] / this.totalReviews * 100).toFixed(2)}
              starCount={val}
              key={index}
            />
          ))}
        </div>
        <div>
          {Object.keys(this.state.meta.characteristics)
            .map((char, index) => (
              <MultiStepProgressBar
                characteristic={char}
                value={this.state.meta.characteristics[char].value}
              />
            ))}
        </div>

      </div>
    );
  }
}

export default MetaData;
