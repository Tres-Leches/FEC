import React from 'react';
import axios from 'axios';
import Rating from 'react-rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar} from '@fortawesome/free-regular-svg-icons';


export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if(this.props.product){
      return (
        <div>
          <div className="reviews" style={this.props.reviews ? {visibility:"visible"} : {visibility:"hidden"}}>
            <Rating initialRating={this.props.rating} fractions={4} readonly
              emptySymbol={<FontAwesomeIcon icon={emptyStar} size="lg" style={{color:"burlywood"}}/>}
              fullSymbol={<FontAwesomeIcon icon={fullStar} size="lg" style={{color:"burlywood"}}/>}

            />
            <h5 className="linkReviews"> Read all {this.props.reviews} reviews </h5>
          </div>
          <h3>{this.props.product.category}</h3>
          <h1>{this.props.product.name}</h1>
        </div>
      );
  } else {
    return (<div></div>)
  }
}
}