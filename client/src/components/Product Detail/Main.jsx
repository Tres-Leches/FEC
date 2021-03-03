import React from 'react';
import axios from 'axios';
import './productDetail.css';
// import 'font-awesome/css/font-awesome.min.css';

import Add2Cart from './Add2Cart';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_ids: [16392, 16465, 16056, 16084, 16154],
      product_id: 16060,
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

  changeStyle(style){
    this.setState({style})
  }

  render() {
    if(this.state.style){
      let view;
      this.state.zoomed ? view = <ExpandedView style={this.state.style} /> : view = <DefaultView style={this.state.style} />
      // console.log('passed to defaultview', this.state.style.photos)
      return (
        <div className="overview">
          <div className="view">
            {view}
          </div>
          <div className="info">
            <ProductInfo productId={this.state.product_id}/>
            <StyleSelector styles={this.state.styles} style={this.state.style} changeStyle={this.changeStyle.bind(this)}/>
            <Add2Cart style={this.state.style}/>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Main;
