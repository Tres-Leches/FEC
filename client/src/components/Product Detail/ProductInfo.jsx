import React from 'react';
import axios from 'axios';
import Rating from 'react-rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar} from '@fortawesome/free-regular-svg-icons';


export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product : null,
      rating: null,
      reviews: 0,
    };
  }

  componentDidMount(){
    axios.get(`/api/products/${this.props.productId}`)
    .then((response) => {
      this.setState({product: response.data})
    })
    .then(()=>{
      this.getRating.call(this);
    })
    .catch(err => console.error(err))

  }

  getRating(){
    axios.get(`/api/reviews/meta/${this.props.productId}`)
    .then((response) => {
      let count = 0;
      let total = 0;
      for(let rating in response.data.ratings){
        count += Number(response.data.ratings[rating]);
        total += Number(rating)*Number(response.data.ratings[rating])
      }
      this.setState({rating: (Math.round(total/count * 4) / 4).toFixed(2), reviews: count})
    })
    .catch(err => console.error(err))
  }

  render() {
    if(this.state.product){
      return (
        <div>
          <div className="reviews" style={this.state.reviews ? {visibility:"visible"} : {visibility:"hidden"}}>
            <Rating initialRating={this.state.rating} fractions={4} readonly
              emptySymbol={<FontAwesomeIcon icon={emptyStar} />}
              fullSymbol={<FontAwesomeIcon icon={fullStar} />}
            />
            <h5 className="linkReviews"> Read all {this.state.reviews} reviews </h5>
          </div>
          <h3>{this.state.product.category}</h3>
          <h1>{this.state.product.name}</h1>
          <h4>${this.state.product.default_price}</h4>
        </div>
      );
  } else {
    return (<div></div>)
  }
}
}