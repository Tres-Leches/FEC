import React, { useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

export default class Add2Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "",
      selectedQuantity: null,
      quantity: 'default',
      clicked: false,
    };
  }

  componentDidUpdate(prevProps){
    if (this.props.style !== prevProps.style) {
      this.setState({quantity: 'default', selectedSize: ""})
    }
  }

  changeQuantity(obj) {
    this.setState({quantity: obj.value >= 15 ? 15 : obj.value, selectedSize: obj.label, clicked: false})
  }

  addHandler(e) {
    if (this.state.selectedSize !== "") {
      alert('Added to cart')
    } else if (this.state.selectedSize === ""){
      this.setState({clicked: true}, () => {alert('Please select size')})
    }
  }

  openMenu() {
    this.setState({ clicked: true });
    this.selectItem.focus();
    //to do open react select menu
  }
  closeMenu() {
    this.setState({ clicked: false });
    //to do close react select menu
  }

  render() {
    let sizes = [];
    Object.keys(this.props.style.skus).forEach((sku, ind) => {
      if(this.props.style.skus[sku].quantity){
        sizes.push({value: `${this.props.style.skus[sku].quantity}`,label: `${this.props.style.skus[sku].size}`}
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
          <div>
            {sizes.length ?
              <Select className="sizeSelector" id="sizeSelector" name="size" placeholder="Select Size" onChange={this.changeQuantity.bind(this)}
              options={sizes}
              value= {this.state.selectedSize === "" ? null: [{value: this.state.selectedSize, label: this.state.selectedSize}]}
              menuIsOpen={this.state.clicked}
              onFocus={this.openMenu.bind(this)}
              onBlur={this.closeMenu.bind(this)}
              ref={node => (this.selectItem = node)}
              styles={{container: styles => ({...styles, border: '1px solid black', borderRadius: '6%'}), control: styles => ({...styles, height: '60px', border: '1px solid black'})}}
              components={{IndicatorSeparator:() => null }}/>
             :
             <Select placeholder="OUT OF STOCK"
             isDisabled="true"
             components={{IndicatorSeparator:() => null }}/>}
          </div>
          <div className="quantitySelector" >
            {this.state.quantity !== 'default'?
              <select id="quantitySelector" name="quantity" >
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
          <button className="add2Bag" onClick={this.addHandler.bind(this)} style={sizes.length ? {visibility: "visible"} : {visibility:"hidden"}}>Add to Bag +</button>
          <button className="add2Favorite"><FontAwesomeIcon icon={faStar}/></button>
         </div>

      </div>
    );
  }
}