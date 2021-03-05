import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default class Add2Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sku : this.props.style.skus[0]
      selectedSize: "",
      selectedQuantity: null,
      quantity: 0,

    };
  }

  componentDidUpdate(prevProps){

    if (this.props.style !== prevProps.style) {
      $(".sizeSelector select").val("");
      this.setState({quantity: 0})
    }
  }

  changeQuantity(e) {
    this.setState({quantity: e.target.value >= 15 ? 15 : e.target.value})
  }

  render() {
    let sizes = Object.keys(this.props.style.skus).map((sku, ind) => {
      if(this.props.style.skus[sku].quantity){
        return(
        <option key={ind}
          value={this.props.style.skus[sku].quantity}
        >
          {this.props.style.skus[sku].size}
        </option>
        )
      }
    })
    let quantities = [];
    for(let i = 1; i<=this.state.quantity;i++) {
      quantities.push(<option key={i}>{i}</option>);
    }
    return (
      <div>
        <div className="selectors">
          <div className="sizeSelector">
            {sizes.length ?
              <select name = "size" onChange={this.changeQuantity.bind(this)}>
                <option value="">Select Size</option>
                {sizes}
              </select>
             :
             <select disabled><option>OUT OF STOCK</option></select>}
          </div>
          <div className="quantitySelector" >
            {this.state.quantity ?
              <select name = "quantity" >
                {quantities}
              </select>
            :
              <select name = "quantity" disabled>
                <option >-</option>
              </select>
            }
          </div>
        </div>

         <br/>
         <div className="add2">
          <button className="add2Bag" style={sizes.length ? {visibility: "visible"} : {visibility:"hidden"}}>Add to Bag +</button>
          <button className="add2Favorite"><FontAwesomeIcon icon={faStar} /></button>
         </div>

      </div>
    );
  }
}