/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import './questions.css';

const schema = yup.object().shape({
  body: yup.string().required().max(1000),
  name: yup.string().required().max(60),
  email: yup.string().required().max(60).email(),
});

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: '',
      userNickname: '',
      userEmail: '',
      userPhotos: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFileUpload(e) {
    const formData = new FormData();
    const { files } = e.target;
    for (let i = 0; i < files.length; i++) {
      formData.append(`image[${i}]`, files[i]);
    }
  }

  handleSubmit(e) {
    const { toggleModal, questionId, getAnswers } = this.props;
    const {
      userAnswer, userNickname, userEmail, userPhotos,
    } = this.state;
    e.preventDefault();
    schema
      .validate({
        body: userAnswer,
        name: userNickname,
        email: userEmail,
        photos: userPhotos,
      })
      .then((value) => {
        axios.post(`/api/qa/questions/${questionId}/answers`, value)
          .then(() => {
            getAnswers();
            toggleModal();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => (window.alert(err)));
  }

  render() {
    const { show, toggleModal } = this.props;
    const { userAnswer, userNickname, userEmail } = this.state;

    if (!show) {
      return null;
    }
    return (
      <div className="qa-modal">
        <div className="qa-modal-content">
          <span
            className="close"
            role="button"
            tabIndex={0}
            onClick={toggleModal}
            onKeyDown={toggleModal}
          >
            &times;
          </span>
          <h2>Post your answer</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="user-answer">
              Your Answer*
              <br />
              <textarea
                name="userAnswer"
                placeholder="What is your answer?"
                value={userAnswer}
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
                placeholder="Example: jack@email.com"
                value={userEmail}
                onChange={this.handleChange}
              />
              <br />
              For privacy reasons, do not use your full name or email address.
            </label>
            <br />
            <label htmlFor="user-photos">
              Your Photos
              <br />
              <input
                type="file"
                multiple
                onChange={this.handleFileUpload}
              />
              <br />
              For privacy reasons, do not use your full name or email address.
            </label>
            <br />
            <input type="button" onClick={toggleModal} value="Cancel" />
            <input type="submit" value="Post" />
          </form>
        </div>
      </div>
    );
  }
}

export default AnswerModal;
