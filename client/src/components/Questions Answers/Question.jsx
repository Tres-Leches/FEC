/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';
import Answer from './Answer';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentDidMount() {
    this.getAnswers();
  }

  getAnswers() {
    const { question } = this.props;
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((response) => {
        this.setState({ answers: response.data.results },
          () => { console.log('Answers: ', this.state.answers); });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { question } = this.props;
    const { answers } = this.state;

    return (
      <div>
        Q:
        {question.question_body}
        Helpful?
        <button type="button">Yes</button>
        {`(${question.question_helpfulness})`}
        <button type="button">Add Answer</button>
        {answers.map((answer) => (
          <Answer key={answer.answer_id} answer={answer} />
        ))}
      </div>
    );
  }
}

export default Question;
