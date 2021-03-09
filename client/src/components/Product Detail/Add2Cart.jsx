import React from 'react';
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

    };
  }

  componentDidUpdate(prevProps){

    if (this.props.style !== prevProps.style) {
      $(".sizeSelector").val("");
      this.setState({quantity: 0})
    }
  }

  changeQuantity(e) {
    console.log(e.target)
    this.setState({quantity: e.target.value >= 15 ? 15 : e.target.value})
  }

  addHandler(e) {
    let size = $('#sizeSelector').val()
    if (size !== 'default') {
      alert('Added to cart')
    } else if (size === 'default'){
      var el = $('#sizeSelector'); // grab the input (jQuery)
      var event = new MouseEvent('mousedown'); // create the event listener
      el.dispatchEvent(event); // attach the event listener to the element
      alert('Select size')
    }
  }


  render() {
    let sizes = Object.keys(this.props.style.skus).map((sku, ind) => {
      if(this.props.style.skus[sku].quantity){
        return(
        {value: `${this.props.style.skus[sku].quantity}`,label: `${this.props.style.skus[sku].size}`}
        )
      }
    })
    let quantities = [];
    for(let i = 1; i<=this.state.quantity;i++) {
      quantities.push(<option key={i}>{i}</option>);
    }

    // let customStyles = {
    //   dropdownIndicatorStyles =
    //   },
    //   }
    // }

    return (
      <div>
        <div className="selectors">
          <div>
            {sizes.length ?
              <Select className="sizeSelector" id="sizeSelector" name="size" placeholder="Select Size" onChange={this.changeQuantity.bind(this)}
              options={sizes}
              // value={sizes.filter(obj => obj.value === selectedValue)}
              styles={{control: styles => ({...styles, height: '60px'})}}
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