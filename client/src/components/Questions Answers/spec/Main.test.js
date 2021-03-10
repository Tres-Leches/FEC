/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Main from '../Main';
import SearchBar from '../SearchBar';
import QuestionsList from '../QuestionsList';
import QuestionModal from '../QuestionModal';

const questions = [{
  question_id: 98125,
  question_body: 'Odio voluptatum qui autem fuga ullam doloremque similique aut architecto.',
  question_date: '2020-11-24T00:00:00.000Z',
  asker_name: 'Misael32',
  question_helpfulness: 48,
  reported: false,
  answers: {
    930659: {
      id: 930659,
      body: 'Alias veniam ut.',
      date: '2020-08-02T00:00:00.000Z',
      answerer_name: 'Sammie.Hudson',
      helpfulness: 16,
      photos: [
        'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
      ],
    },
  },
}];

describe('Main', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Main debug />);
    expect(component).toMatchSnapshot();
  });
});

describe('Render Search Bar', () => {
  it('should render search bar', () => {
    const component = shallow(<SearchBar />);
    expect(component).toMatchSnapshot();
  });

  it('should take search parameter as prop', () => {
    const query = 'string';
    const component = mount(<SearchBar searchQuery={query} />);
    expect(component.props().searchQuery).toEqual(query);
  });

  it('should change state after input change', () => {
    const query = 'string';
    const wrapper = mount(<Main />);
    const input = wrapper.find('#search-field');
    expect(input).toHaveLength(1);
    input.simulate('change', { target: { value: query } });
    expect(wrapper.state().searchQuery).toEqual(query);
  });
});

describe('Render Questions List', () => {
  it('should render questions list', () => {
    const component = shallow(<QuestionsList questions={questions} />);
    expect(component).toMatchSnapshot();
  });

  it('should take questions array as prop', () => {
    const component = mount(<QuestionsList questions={questions} />);
    expect(component.props().questions).toEqual(questions);
  });

  it('should change state when toggled', () => {
    const wrapper = mount(<QuestionsList questions={questions} />);
    const button = wrapper.findWhere((node) => (
      node.type() === 'button' &&
      node.text() === 'ADD A QUESTION +'
    ));
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(wrapper.state().show).toEqual(true);
  });
});

describe('Render Question Modal', () => {
  it('should render question modal', () => {
    const component = shallow(<QuestionModal show />);
    expect(component).toMatchSnapshot();
  });

  it('should close question modal', () => {
    let show = true;
    const closeModal = () => {
      show = !show;
    };
    const wrapper = mount(<QuestionModal show closeModal={closeModal} />);
    const button = wrapper.find('.close');
    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(show).toEqual(false);
  });

  it('should expect the correct inputs and submit button', () => {
    const show = true;
    const wrapper = mount(<QuestionModal show={show} />);
    const inputs = wrapper.find('form').find('input');
    expect(inputs).toHaveLength(4);
  });
});
