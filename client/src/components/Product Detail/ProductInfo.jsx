import React from 'react';
import axios from 'axios';

export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product : null
    };
  }

  componentDidMount(){
    axios.get(`/api/products/${this.props.productId}`)
    .then((response) => {
      // console.log(response.data)
      this.setState({product: response.data})
    })
    .catch(err => console.error(err))
  }

  render() {
    if(this.state.product){
      return (
        <div>
          <h3>{this.state.product.category}</h3>
          <h1>{this.state.product.name}</h1>
          <h4>${this.state.product.default_price}</h4>
        </div>
      );
  } else {
    return (
      <div></div>
    )
  }
}
}