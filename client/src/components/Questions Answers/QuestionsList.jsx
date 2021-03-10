/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';
import QuestionModal from './QuestionModal';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    const { questions } = this.props;
    this.state = {
      show: false,
      questionsLen: 2,
      remainLen: questions.length - 2,
      hasMoreItems: true,
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateQuestionLen = this.updateQuestionLen.bind(this);
    this.resetQuestionLen = this.resetQuestionLen.bind(this);
    this.handleListScroll = this.handleListScroll.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (questions !== prevProps.questions) {
      this.resetQuestionLen();
    }
  }

  handleListScroll(e) {
    const { hasMoreItems } = this.state;
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (hasMoreItems) {
        this.updateQuestionLen();
      }
    }
  }

  updateQuestionLen() {
    const { questionsLen, remainLen } = this.state;
    this.setState({
      questionsLen: questionsLen + 2,
      remainLen: remainLen - 2,
    }, () => {
      if (remainLen <= 0) {
        this.setState({ hasMoreItems: false });
      }
    });
  }

  resetQuestionLen() {
    const { questions } = this.props;
    this.setState({
      questionsLen: 2,
      remainLen: questions.length - 2,
      hasMoreItems: true,
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

    if (questions) {
      return (
        <div className="questionslist-container">
          <div className="scroll" onScroll={this.handleListScroll}>
            {questions.slice(0, questionsLen).map((question) => (
              <Question
                key={question.question_id}
                question={question}
                getQuestions={getQuestions}
              />
            ))}
          </div>
          {(remainLen > 0) && (
            <button
              type="button"
              className="questionslist-actions"
              onClick={this.updateQuestionLen}
            >
              {`MORE ANSWERED QUESTIONS (${remainLen})`}
            </button>
          )}
          {(remainLen <= 0 && questions.length > 2) && (
            <button
              type="button"
              className="questionslist-actions"
              onClick={this.resetQuestionLen}
            >
              COLLAPSE QUESTIONS
            </button>
          )}
          <button
            type="button"
            className="questionslist-actions"
            onClick={this.showModal}
          >
            ADD A QUESTION +
          </button>
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
  }
}

export default QuestionsList;
