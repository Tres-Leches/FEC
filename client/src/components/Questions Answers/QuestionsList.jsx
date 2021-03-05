/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';
import QuestionModal from './QuestionModal';
import './questions.css';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    const { questions } = this.props;
    this.state = {
      show: false,
      questionsLen: 2,
      remainLen: questions.length - 2,
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateQuestionLen = this.updateQuestionLen.bind(this);
    this.resetQuestionLen = this.resetQuestionLen.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (questions !== prevProps.questions) {
      this.resetQuestionLen();
    }
  }

  updateQuestionLen() {
    const { questionsLen, remainLen } = this.state;
    this.setState({
      questionsLen: questionsLen + 2,
      remainLen: remainLen - 2,
    });
  }

  resetQuestionLen() {
    const { questions } = this.props;
    this.setState({
      questionsLen: 2,
      remainLen: questions.length - 2,
    });
  }

  showModal() {
    this.setState({ show: true }, () => {
      const { show } = this.state;
      if (show) {
        document.body.style.overflow = 'hidden';
        document.getElementsByClassName('scroll').overflow = 'hidden';
      }
    });
  }

  closeModal() {
    this.setState({ show: false }, () => {
      const { show } = this.state;
      if (!show) {
        document.body.style.overflow = 'unset';
        document.getElementsByClassName('scroll').overflow = 'unset';
      }
    });
  }

  render() {
    const { questions, getQuestions, productId } = this.props;
    const { show, questionsLen, remainLen } = this.state;

    // if (!isExpand) {
    if (questions) {
      return (
        <div>
          <div className="scroll">
            {questions.slice(0, questionsLen).map((question) => (
              <Question
                key={question.question_id}
                question={question}
                getQuestions={getQuestions}
              />
            ))}
          </div>
          {remainLen > 0
            ? <button type="button" onClick={this.updateQuestionLen}>{`MORE ANSWERED QUESTIONS (${remainLen})`}</button>
            : <button type="button" onClick={this.resetQuestionLen}>COLLAPSE QUESTIONS</button>}
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
    return null;
    // }
    // return (
    //   <div>
    //     <div className="scroll">
    //       {questions.map((question) => (
    //         <Question
    //           key={question.question_id}
    //           question={question}
    //           getQuestions={getQuestions}
    //         />
    //       ))}
    //     </div>
    //     <button type="button" onClick={this.toggleExpand}>COLLAPSE QUESTIONS</button>
    //     <button type="button" onClick={this.showModal}>ADD A QUESTION</button>
    //     <QuestionModal
    //       show={show}
    //       showModal={this.showModal}
    //       closeModal={this.closeModal}
    //       productId={productId}
    //     />
    //   </div>
    // );
  }
}

export default QuestionsList;
