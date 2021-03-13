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
      this.setState({quantity: 'default', selectedSize: "", selectedQuantity:null})
    }
  }

  changeQuantity(obj) {
    this.setState({
      quantity: obj.value >= 15 ? 15 : obj.value,
      selectedSize: obj.label,
      selectedQuantity:{value:1, label:1},
      clicked: false
    })
  }
  changeSelectedQuantity(obj) {
    this.setState({selectedQuantity: obj})
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
  }
  closeMenu() {
    this.setState({ clicked: false });
  }

  render() {
    let sizes = [];
    let quantities = [];
    Object.keys(this.props.style.skus).forEach((sku, ind) => {
      if(this.props.style.skus[sku].quantity){
        sizes.push({value: `${this.props.style.skus[sku].quantity}`,label: `${this.props.style.skus[sku].size}`}
        )
      }
    })
    for(let i =1; i<= this.state.quantity; i++){
      quantities.push({value: i, label: i});
    }

    let containerStyles = {
      border: '1px solid burlywood',
      borderRadius: '5px',
      color:'black',
      filter: this.props.isDark ? "brightness(.8) contrast(1.2)" : "",
      zIndex:'2',
    }
    let controlStyles = {
      height: '60px',
      border: '1px solid burlywood'
    }

    return (
      <div>
        <div className="selectors">
          <div>
            {sizes.length ?
              <Select className="sizeSelector" id="sizeSelector" name="size"
                placeholder="Select Size"
                onChange={this.changeQuantity.bind(this)}
                options={sizes}
                value= {this.state.selectedSize === "" ? null: [{value: this.state.selectedSize, label: this.state.selectedSize}]}
                menuIsOpen={this.state.clicked}
                onFocus={this.openMenu.bind(this)}
                onBlur={this.closeMenu.bind(this)}
                ref={node => (this.selectItem = node)}
                styles={{
                  container: styles => ({...styles, ...containerStyles}),
                  control: styles => ({...styles, ...controlStyles})
                }}
                components={{IndicatorSeparator:() => null }}
              />
             :
             <Select className="sizeSelector" placeholder="OUT OF STOCK"
              styles={{
                container: styles => ({...styles, ...containerStyles}),
                control: styles => ({...styles, ...controlStyles})
              }}
              isDisabled={true}
              components={{IndicatorSeparator:() => null }}
             />
            }
          </div>
          <div>
            {this.state.quantity !== 'default'?
              // <select id="quantitySelector" name="quantity" >
              //   {quantities}
              // </select>
              <Select className="quantitySelector" id="quantitySelector" name="quantity"
                options={quantities}
                value={this.state.selectedQuantity}
                onChange={this.changeSelectedQuantity.bind(this)}
                styles={{
                  container: styles => ({...styles, ...containerStyles}),
                  control: styles => ({...styles, ...controlStyles})
                }}
                components={{IndicatorSeparator:() => null }}
              />
            :
            <Select className="quantitySelector" id="quantitySelector" placeholder="-"
              value={{value:"-", label:"-"}}
              styles={{
                container: styles => ({...styles, ...containerStyles}),
                control: styles => ({...styles, ...controlStyles})
              }}
              isDisabled={true}
              components={{IndicatorSeparator:() => null }}
            />
            }
          </div>
        </div>

         <br/>
         <div className="add2">
          <button className="add2Bag" onClick={this.addHandler.bind(this)} style={sizes.length ? {visibility: "visible"} : {visibility:"hidden"}}>Add to Bag +</button>
          <button className="add2Favorite"><FontAwesomeIcon className="starIcon" icon={faStar}/></button>
         </div>

      </div>
    );
  }
}