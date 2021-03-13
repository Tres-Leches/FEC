import React from 'react';
import axios from 'axios';

import Add2Cart from './Add2Cart';
import DefaultView from './DefaultView';
import ExpandedView from './ExpandedView';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import Share from './Share';
import EndInfo from './EndInfo';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_ids: [16392, 16465, 16056, 16084, 16154, 16060, 16072, 16073],
      // product_id: 16060,
      // product: null,
      product_id: Number(this.props.productId),
      product: this.props.product,
      zoomed: false,
      styles: [],
      style: null,
      mainPhoto: null,
    };
    this.getStyles = this.getStyles.bind(this);
  }

  componentDidMount() {
    this.getStyles();
  }
  componentDidUpdate(prevProps){
    if(this.props.product !== prevProps.product || this.props.productId !== prevProps.productId) {
      this.setState({
        product: this.props.product,
        product_id: this.props.productId,
      }, () => {this.getStyles()})
    }
  }

  getStyles() {
    axios.get(`/api/products/${this.state.product_id}/styles`)
      .then((response) => {
        this.setState({styles: response.data.results, style: response.data.results[0], mainPhoto: response.data.results[0].photos[0]})
      })
      .catch(err => console.error(err))
  }

  changeStyle(style) {
    this.setState({style})
  }

  changeMainPhoto (photo) {
    this.setState({mainPhoto: photo})
  }

  changeView() {
    this.setState({zoomed: !this.state.zoomed})
  }

  render() {
    if(this.state.style && this.state.product){
      let expand;
      if (this.state.zoomed) {
        expand = <ExpandedView style={this.state.style}
          isDark={this.props.isDark}
          mainPhoto={this.state.mainPhoto}
          changeMainPhoto={this.changeMainPhoto.bind(this)}
          changeView={this.changeView.bind(this)}/> ;
        document.body.style.overflow = 'hidden';
      } else {
        expand = "";
        document.body.style.overflow = 'visible';
      }
      return (
        <div className="productDetails">
          {expand}
          <div className="overview">
            <div className="view">
              <DefaultView style={this.state.style} changeView={this.changeView.bind(this)} mainPhoto={this.state.mainPhoto} changeMainPhoto={this.changeMainPhoto.bind(this)}/>
              <div className="info">
                <ProductInfo product={this.state.product} productId={this.state.product_id}/>
                <StyleSelector styles={this.state.styles} style={this.state.style} changeStyle={this.changeStyle.bind(this)}/>
                <Add2Cart style={this.state.style} isDark={this.props.isDark}/>
                <Share />
              </div>
            </div>
            <div className="viewLastInfo">
              <EndInfo product={this.state.product}/>
            </div>
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

export default Main
