/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';
import './questions.css';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  }

  render() {
    const { questions, getQuestions } = this.props;
    const { isExpand } = this.state;
    const initialQ = questions.slice(0, 2);
    if (!isExpand) {
      return (
        <div>
          <div className="scroll">
            {initialQ.map((question) => (
              <Question
                key={question.question_id}
                question={question}
                getQuestions={getQuestions}
              />
            ))}
          </div>
          <button type="button" onClick={this.toggleExpand}>More Answered Questions</button>
        </div>
      );
    }
    return (
      <div>
        <div className="scroll">
          {questions.map((question) => (
            <Question
              key={question.question_id}
              question={question}
              getQuestions={getQuestions}
            />
          ))}
        </div>
        <button type="button" onClick={this.toggleExpand}>Less Questions</button>
      </div>
    );
  }
}

export default QuestionsList;
