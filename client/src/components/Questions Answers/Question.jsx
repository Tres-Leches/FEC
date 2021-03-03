/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';
import AnswerList from './AnswerList';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      disabled: false,
    };
    this.getAnswers = this.getAnswers.bind(this);
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
  }

  componentDidMount() {
    this.getAnswers();
  }

  getAnswers() {
    const { question } = this.props;
    axios.get(`/api/qa/questions/${question.question_id}/answers`)
      .then((response) => {
        this.setState({ answers: response.data.results });
      })
      .catch((err) => console.error(err));
  }

  updateHelpfulness() {
    const { question, getQuestions } = this.props;
    const { disabled } = this.state;
    if (disabled) {
      return;
    }
    axios.put(`/api/qa/questions/${question.question_id}/helpful`)
      .then(() => {
        this.setState({ disabled: true });
        getQuestions();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { question } = this.props;
    const { answers, disabled } = this.state;

    return (
      <div>
        Q:
        {question.question_body}
        Helpful?
        <button type="button" onClick={this.updateHelpfulness} disabled={disabled}>Yes</button>
        {`(${question.question_helpfulness})`}
        <button type="button">Add Answer</button>
        <AnswerList answers={answers} getAnswers={this.getAnswers} />

      </div>
    );
  }
}

export default Question;
