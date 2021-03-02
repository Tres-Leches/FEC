/* eslint-disable react/prop-types */
import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { answer } = this.props;
    return (
      <div>
        A:
        {answer.body}
        By:
        {answer.answerer_name}
        | Helpful?
        <button type="button">
          Yes
        </button>
        {`(${answer.helpfulness})`}
        <button type="button">Report</button>
      </div>
    );
  }
}

export default Answer;
