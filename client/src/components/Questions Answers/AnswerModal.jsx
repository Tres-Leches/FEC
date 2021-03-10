/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Image from './Image';

const HOST_URL = 'https://api.cloudinary.com/v1_1/drpklcnse/auto/upload';
const preset = 'piptu8gm';

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
      userPhotos: [], // array of stringURL
      files: [], // array of img obj url as base64
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.hostImagesAsync = this.hostImagesAsync.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.setState({
        userAnswer: '',
        userNickname: '',
        userEmail: '',
        files: [],
      });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFileUpload(e) {
    const { files } = this.state;
    Promise.all([...e.target.files].map((file) => (
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (ev) => {
          resolve({ url: ev.target.result });
        });
        reader.addEventListener('error', reject);
        reader.readAsDataURL(file);
      }))))
      .then((images) => {
        this.setState({ files: files.concat(images) });
      });
  }

  handleSubmit(e) {
    const { toggleModal, questionId, getAnswers } = this.props;
    const {
      userAnswer, userNickname, userEmail, files,
    } = this.state;
    const promises = [];
    e.preventDefault();
    // Submit to Image Host API
    for (let i = 0; i < files.length; i++) {
      promises.push(this.hostImagesAsync(files[i].url));
    }

    Promise.all(promises)
      .then((results) => {
        this.setState({ userPhotos: results }, () => {
          schema.validate({
            body: userAnswer,
            name: userNickname,
            email: userEmail,
            photos: this.state.userPhotos,
          })
            .then((value) => {
              axios.post(`/api/qa/questions/${questionId}/answers`, value)
                .then(() => {
                  getAnswers();
                  toggleModal();
                });
            })
            .catch((err) => (window.alert(err)));
        });
      })
      .catch((err) => console.error(err));
  }

  hostImagesAsync(imgURL) {
    return (
      axios.post(`${HOST_URL}`, {
        file: imgURL,
        upload_preset: preset,
      })
        .then((response) => (
          response.data.url
        ))
        .catch((err) => err)
    );
  }

  render() {
    const { show, toggleModal } = this.props;
    const {
      userAnswer, userNickname, userEmail, files,
    } = this.state;

    if (!show) {
      return null;
    }
    return (
      <div className="qa-modal">
        <div className="qa-modal-content">
          <div className="qa-modal-header">
            <h2>Post your answer</h2>
            <span
              className="close"
              role="button"
              tabIndex={0}
              onClick={toggleModal}
              onKeyDown={toggleModal}
            >
              &times;
            </span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="user-answer">
              <span className="label">Your Answer </span>
              <span className="required">*</span>
              <textarea
                name="userAnswer"
                placeholder=" What is your answer?"
                value={userAnswer}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="user-nickname">
              <span className="label">Your Nickname </span>
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
              <span className="label">Your Email </span>
              <span className="required">*</span>
              <input
                type="text"
                name="userEmail"
                placeholder=" Example: jack@email.com"
                value={userEmail}
                onChange={this.handleChange}
              />
              <span className="disclaimer">For privacy reasons, do not use your full name or email address.</span>
            </label>
            <label htmlFor="user-photos">
              <span className="label">Your Photos </span>
              <input
                type="file"
                multiple
                onChange={this.handleFileUpload}
              />
              {files.length > 0 && files.map((fileURL) => (
                <Image key={fileURL.url} photo={fileURL} />
              ))}
            </label>
            <label htmlFor="form-actions">
              <input type="button" onClick={toggleModal} value="Cancel" />
              <input type="submit" value="Post" />
            </label>
          </form>
          <div className="qa-modal-footer" />
        </div>
      </div>
    );
  }
}

export default AnswerModal;
