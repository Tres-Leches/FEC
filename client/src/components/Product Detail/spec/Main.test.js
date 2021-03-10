import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
// import { expect } from 'chai';

import Main from '../Main.jsx';
import Add2Cart from '../Add2Cart';
import DefaultView from '../DefaultView';
import ExpandedView from '../ExpandedView';
import ProductInfo from '../ProductInfo';
import StyleSelector from '../StyleSelector';
import Share from '../Share';
import EndInfo from '../EndInfo';
// import 'font-awesome/css/font-awesome.min.css';


const style = {photos :[{thumbnail_url:"", url:""}], skus:{0:{quantity:1,size:""}}}
const product ={name:"", slogan:"", description:"",category:"", default_price:"", features:[{feature:"", value:""}]};


describe('Main', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Main debug />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Main/>);
    expect(component).toMatchSnapshot();
  });

  // it('calls componentDidMount', () => {
  //   sinon.spy(Main.prototype, 'componentDidMount');
  //   const wrapper = mount(<Main />);
  //   expect(Main.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  //   Main.prototype.componentDidMount.restore();
  // });

});

describe('DefaultView', () => {
  it('should render correctly with props', () => {
    const component = shallow(<DefaultView style={style} changeView={jest.fn} mainPhoto={{url:"", thumbnail_url:""}} changeMainPhoto={jest.fn}/>);
    expect(component).toMatchSnapshot();
  });
  // it('calls componentDidMount', () => {
  //   sinon.spy(DefaultView.prototype, 'componentDidMount');
  //   const wrapper = mount(<DefaultView style={style} changeView={jest.fn} mainPhoto={{url:"", thumbnail_url:""}} changeMainPhoto={jest.fn}/>);
  //   expect(DefaultView.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  //   DefaultView.prototype.componentDidMount.restore();
  // });
  // it('should change to expand view when main image display is clicked', () => {
  //   const clickFn = jest.fn();
  //   const component = shallow(<DefaultView onClick={clickFn} />);
  //   component
  //     .find('.mainDisplay')
  //     .simulate('click');
  //   expect(clickFn).toHaveBeenCalled();
  // });
})

describe('ExpandedView', () => {
  it('should render correctly with props', () => {
    const component = shallow(<ExpandedView style={style} changeView={jest.fn} mainPhoto={{url:"", thumbnail_url:""}} changeMainPhoto={jest.fn}/>);
    expect(component).toMatchSnapshot();
  });

});

describe('ProductInfo', () => {
  it('should render correctly with props', () => {
    const component = shallow(<ProductInfo product={product} productId={0}/>);
    expect(component).toMatchSnapshot();
  });

});

describe('StyleSelector', () => {
  it('should render correctly with props', () => {
    const component = shallow(<StyleSelector styles={[style]} style={style} changeStyle={jest.fn}/>);
    expect(component).toMatchSnapshot();
  });

});

describe('Add2Cart', () => {
  it('should render correctly with props', () => {
    const component = shallow(<Add2Cart style={style}/>);
    expect(component).toMatchSnapshot();
  });

});

describe('Share', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<Share/>);
    expect(component).toMatchSnapshot();
  });

});

describe('EndInfo', () => {
  it('should render correctly with props', () => {
    const component = shallow(<EndInfo product={product}/>);
    expect(component).toMatchSnapshot();
  });

});