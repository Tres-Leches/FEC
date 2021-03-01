import React from 'react';
import axios from 'axios';

export default class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: this.props.style.photos[0]
    };
  }

  render() {
    return (
      <div>
        <img src={this.state.currentPhoto.url}/><br />
        {this.props.style.photos.map((photo, key) => (
          <img key={key} src={photo.thumbnail_url} />
        ))}
      </div>

    );
  }
}