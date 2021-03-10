import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Main from '../Main.jsx';
import 'font-awesome/css/font-awesome.min.css';

describe('Main', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Main debug />);
    expect(component).toMatchSnapshot();
  });


});
