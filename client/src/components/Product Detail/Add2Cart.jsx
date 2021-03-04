import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default class Add2Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sku : this.props.style.skus[0]
      max: 15,
    };
  }

  render() {
    return (
      <div>
        <div className="selectors">
          <div className="sizeSelector">
            <select name = "size" >
                <option >Select Size</option>
                {Object.keys(this.props.style.skus).map((sku, ind) => (
                  <option key={ind}>{this.props.style.skus[sku].size}</option>
                ))}
            </select>
          </div>
          <div className="quantitySelector">
            <select name = "quantity" disabled>
                <option >-</option>
            </select>
          </div>
        </div>

         <br/>
         <button className="add2Bag">Add to Bag +</button><button className="add2Favorite"><FontAwesomeIcon icon={faStar} /></button>
      </div>
    );
  }
}