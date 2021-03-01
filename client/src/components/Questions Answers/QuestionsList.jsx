import React from 'react';
import Question from './Question';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Hello from QuestionsList
        <Question />
      </div>
    );
  }
}

export default QuestionsList;
