/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      hasMore: true,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  }

  render() {
    const { questions } = this.props;
    const { isExpand, hasMore } = this.state;
    const initialQ = questions.slice(0, 2);
    if (!isExpand) {
      return (
        <div>
          {initialQ.map((question) => (
            <Question key={question.question_id} question={question} />
          ))}
          {!hasMore && (
          <button type="button" onClick={this.toggleExpand}>
            More Answered Questions
          </button>
          )}
        </div>
      );
    }
    return (
      <div>
        {questions.map((question) => (
          <Question key={question.question_id} question={question} />
        ))}
        <button type="button" onClick={this.toggleExpand}>Less Questions</button>
      </div>
    );
  }
}

export default QuestionsList;
