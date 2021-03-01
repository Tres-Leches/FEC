import React from 'react';
import Answers from './Answers';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Hello from Questions
        <Answers />
      </div>
    );
  }
}

export default Question;
