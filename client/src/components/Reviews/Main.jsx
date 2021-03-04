import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      metadata: []
    };
  }

  componenetDidMount() {
    //get data from api and assign to state
  }

  render() {
    return (
      <div>
        Hello from Reviews
      </div>
    );
  }
}

export default Main;
