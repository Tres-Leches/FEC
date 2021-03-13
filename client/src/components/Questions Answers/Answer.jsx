/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Image from './Image';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      reported: false,
    };
    this.updateAnsHelpfulness = this.updateAnsHelpfulness.bind(this);
    this.toggleAnsReported = this.toggleAnsReported.bind(this);
  }

  updateAnsHelpfulness(e) {
    const { answer, getAnswers } = this.props;
    const { disabled } = this.state;
    if (disabled) {
      return;
    }
    e.target.style.textDecoration = 'none';
    axios.put(`/api/qa/answers/${answer.answer_id}/helpful`)
      .then(() => {
        this.setState({ disabled: true });
        getAnswers();
      })
      .catch((err) => console.error(err));
  }

  toggleAnsReported(e) {
    const { answer } = this.props;
    const { reported } = this.state;
    if (reported) {
      return;
    }
    e.target.style.textDecoration = 'none';
    axios.put(`/api/qa/answers/${answer.answer_id}/report`)
      .then(() => {
        this.setState({ reported: true });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { answer } = this.props;
    const { disabled, reported } = this.state;
    const havePhotos = answer.photos.length > 0;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(answer.date);
    const formattedDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

    return (
      <div className="answer-body-container">
        <div className="answer-body">
          {answer.body}
        </div>
        {havePhotos && (
          <div className="answer-photos">
            {answer.photos.map((photo) => (
              <Image key={photo.id} photo={photo} />
            ))}
          </div>
        )}
        <div className="answer-info">
          <div className="answer-author">
            by &nbsp;
            {answer.answerer_name}
            , &nbsp;
            {formattedDate}
          </div>
          <div className="text-divider"> | </div>
          <div className="answer-info-actions">
            Helpful?
            <button
              type="button"
              className="button-link"
              style={{ textDecoration: 'underline' }}
              onClick={this.updateAnsHelpfulness}
              disabled={disabled}
            >
              Yes
            </button>
            {`(${answer.helpfulness})`}
            <div className="text-divider"> | </div>
            <button
              type="button"
              className="button-link"
              style={{ textDecoration: 'underline' }}
              onClick={this.toggleAnsReported}
              disabled={reported}
            >
              {reported ? 'Reported' : 'Report'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Answer;
