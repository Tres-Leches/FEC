import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ReviewTile = (props) => (
  <div>
    <span className="reviewRating">{props.review.rating}</span>
    <span className="reviewDate">{props.review.date.slice(0, 10)}</span>
    <div className="reviewSummary">{props.review.summary}</div>
    <div className="reviewBody">{props.review.body}</div>
    <span className="reviewRecommend">
      {props.review.recommend ? (
        <span>
          <FontAwesomeIcon icon={faCheck} />
          {' '}
          I recommend this product
        </span>
      ) : null}
    </span>
  </div>
);

export default ReviewTile;
