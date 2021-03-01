/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        Hello from QuestionsList
        {questions.map((question) => (
          <Question key={question.question_id} question={question} />
        ))}
      </div>
    );
  }
}

export default QuestionsList;
