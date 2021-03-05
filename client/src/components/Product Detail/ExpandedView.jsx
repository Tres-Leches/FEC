import React from 'react';
import axios from 'axios';

export default class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="expandedView">
        <div>

        </div>
        {/* <img src={this.state.currentPhoto.url}/> */}
      </div>
    );
  }
}