/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
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
          })
          .catch((err) => console.error(err));
      })
      .then(() => closeModal())
      .catch((err) => (window.alert(err)));
  }

  render() {
    const { show, closeModal } = this.props;
    const { userQuestion, userNickname, userEmail } = this.state;

    if (!show) {
      return null;
    }
    return (
      <div className="qa-modal">
        <div className="qa-modal-content">
          <div className="qa-modal-header">
            <h2>Post your question</h2>
            <span
              className="close"
              role="button"
              tabIndex={0}
              onClick={closeModal}
              onKeyDown={closeModal}
            >
              &times;
            </span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="user-question">
              <span className="label">Your Question </span>
              <span className="required">*</span>
              <textarea
                name="userQuestion"
                placeholder=" What is your question?"
                value={userQuestion}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="user-nickname">
              <span className="label">Nickname </span>
              <span className="required">*</span>
              <input
                type="text"
                name="userNickname"
                placeholder=" Example: jackson11"
                value={userNickname}
                onChange={this.handleChange}
              />
              <span className="disclaimer">For privacy reasons, do not use your full name or email address.</span>
            </label>
            <label htmlFor="user-email">
              <span className="label">Email </span>
              <span className="required">*</span>
              <input
                type="text"
                name="userEmail"
                placeholder=" Example: jackson@hackreactor.com"
                value={userEmail}
                onChange={this.handleChange}
              />
              <span className="disclaimer">For privacy reasons, do not use your full name or email address.</span>
            </label>
            <label htmlFor="form-actions">
              <input type="button" onClick={closeModal} value="Cancel" />
              <input type="submit" value="Post" />
            </label>
          </form>
          <div className="qa-modal-footer" />
        </div>
      </div>
    );
  }
}

export default QuestionModal;
