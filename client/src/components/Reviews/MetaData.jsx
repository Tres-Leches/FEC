import React from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import { faCheck, faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

class MetaData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: this.props
    };
  }

  render() {
    return(
      <div>
        <div>Avg Rating</div>
      </div>
    );
  }
}