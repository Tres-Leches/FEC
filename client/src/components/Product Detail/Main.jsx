import React from 'react';
import axios from 'axios';

import Add2Cart from './Add2Cart';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id:16154,
      zoomed: false,
      styles: [],
      style: null
    };
  }

  componentDidMount() {
    axios.get(`/api/products/${this.state.product_id}/styles`)
      .then((response) => {
        // console.log(data)
        this.setState({styles: response.data.results, style: response.data.results[0]})
      })
      .catch(err => console.error(err))
  }

  render() {
    let view;
    this.state.zoomed ? view = <ExpandedView /> : view = <DefaultView />
    return (
      <div>
        Hello from Product Detail
        {view}
        <ProductInfo />
        <StyleSelector styles={this.state.styles} style={this.state.style}/>
        <Add2Cart />
      </div>
    );
  }
}

export default Main;
