/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';
import AnswerList from './AnswerList';
import AnswerModal from './AnswerModal';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      disabled: false,
      show: false,
    };
    this.getAnswers = this.getAnswers.bind(this);
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal() {
    const { show } = this.state;
    this.setState({ show: !show }, () => {
      if (!show) {
        document.body.style.overflow = 'hidden';
        document.getElementsByClassName('scroll').overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        document.getElementsByClassName('scroll').overflow = 'unset';
      }
    });
  }

  render() {
    const { question } = this.props;
    const { answers, disabled, show } = this.state;

    return (
      <div className="qa-wrapper">
        <div className="question-wrapper">
          <div className="question-header">
            Q:
          </div>
          <div className="question-body">
            {question.question_body}
          </div>
          <div className="question-actions">
            Helpful?
            <button type="button" onClick={this.updateHelpfulness} disabled={disabled}>Yes</button>
            {`(${question.question_helpfulness})`}
            <button type="button" onClick={this.toggleModal}>Add Answer</button>
            <AnswerModal
              show={show}
              toggleModal={this.toggleModal}
              questionId={question.question_id}
              getAnswers={this.getAnswers}
            />
          </div>
        </div>
        <AnswerList
          answers={answers}
          getAnswers={this.getAnswers}
        />

      </div>
    );
  }
}

export default Question;
