import React from 'react';
import axios from 'axios';

import withTracker from '../../Interactions';
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
      product_id: Number(this.props.productId),
      product: this.props.product,
      zoomed: false,
      style: this.props.styles[0],
      mainPhoto: this.props.styles[0].photos[0],
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.product !== prevProps.product || this.props.productId !== prevProps.productId || this.props.styles !== prevProps.styles) {
      this.setState({
        product: this.props.product,
        product_id: this.props.productId,
        style: this.props.styles[0],
        mainPhoto: this.props.styles[0].photos[0]
      })
    }
  }

  changeStyle(style) {
    this.setState({style})
  }

  changeMainPhoto(photo) {
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
              <ProductInfo product={this.state.product} productId={this.state.product_id} rating={this.props.rating} reviews={this.props.review}/>
              <StyleSelector styles={this.props.styles} style={this.state.style} changeStyle={this.changeStyle.bind(this)}/>
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
