import React from 'react';
import axios from 'axios';

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
        <select name = "size">
            <option >Select Size</option>
            {Object.keys(this.props.style.skus).map((sku, ind) => (
              <option key={ind}>{this.props.style.skus[sku].size}</option>
            ))}

         </select>
         <select name = "quantity">
            <option >-</option>

         </select>
      </div>
    );
  }
}