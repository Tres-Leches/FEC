/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './questions.css';

let schema = yup.object().shape({
  body: yup.string().required().max(1000),
  name: yup.string().required().max(60),
  email: yup.string().required().max(60).email(),
  product_id: yup.number().positive().integer(),
});

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuestion: '',
      userNickname: '',
      userEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { closeModal, productId, getQuestions } = this.props;
    const { userQuestion, userNickname, userEmail } = this.state;
    e.preventDefault();
    schema
      .validate({
        body: userQuestion,
        name: userNickname,
        email: userEmail,
        product_id: Number(productId),
      })
      .then((value) => {
        axios.post(`/api/qa/questions/${productId}`, value)
          .then(() => {
            getQuestions();
            closeModal();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => (window.alert(err)));
  }

  render() {
    const { show, closeModal } = this.props;
    const { userQuestion, userNickname, userEmail } = this.state;

    if (!show) {
      return null;
    }
    return (
      <div className="question-modal">
        <div className="question-modal-content">
          <span
            className="close"
            role="button"
            tabIndex={0}
            onClick={closeModal}
            onKeyDown={closeModal}
          >
            &times;
          </span>
          <h2>Post your question</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="user-question">
              Your Question*
              <br />
              <textarea
                name="userQuestion"
                placeholder="What is your question?"
                value={userQuestion}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label htmlFor="user-nickname">
              Your Nickname*
              <br />
              <input
                type="text"
                name="userNickname"
                placeholder="Example: jackson11!"
                value={userNickname}
                onChange={this.handleChange}
              />
              <br />
              For privacy reasons, do not use your full name or email address.
            </label>
            <br />
            <label htmlFor="user-email">
              Your Email*
              <br />
              <input
                type="text"
                name="userEmail"
                value={userEmail}
                onChange={this.handleChange}
              />
              <br />
              For privacy reasons, do not use your full name or email address.
            </label>
            <br />
            <input type="button" onClick={closeModal} value="Cancel" />
            <input type="submit" value="Post" />
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionModal;
