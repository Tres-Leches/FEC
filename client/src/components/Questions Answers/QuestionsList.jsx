/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';
import QuestionModal from './QuestionModal';
import './questions.css';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      show: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggleExpand() {
    const { isExpand } = this.state;
    this.setState({ isExpand: !isExpand });
  }

  showModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    const { questions, getQuestions, productId } = this.props;
    const { isExpand, show } = this.state;
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
          <button type="button" onClick={this.toggleExpand}>MORE ANSWERED QUESTIONS</button>
          <button type="button" onClick={this.showModal}>ADD A QUESTION</button>
          <QuestionModal
            show={show}
            showModal={this.showModal}
            closeModal={this.closeModal}
            productId={productId}
            getQuestions={getQuestions}
          />
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
        <button type="button" onClick={this.toggleExpand}>COLLAPSE QUESTIONS</button>
        <button type="button" onClick={this.showModal}>ADD A QUESTION</button>
        <QuestionModal
          show={show}
          showModal={this.showModal}
          closeModal={this.closeModal}
          productId={productId}
        />
      </div>
    );
  }
}

export default QuestionsList;
