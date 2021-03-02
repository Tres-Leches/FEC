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
      <div className="container">
        <div className="mainDisplay">
          <img src={this.state.currentPhoto.url}/>
        </div>
        <ul className="thumbnails">
        {this.props.style.photos.map((photo, key) => (
          <li key={key} id={"slide"+key} ><img src={photo.url} /> </li>
        ))}
        </ul>

        {/* <ul className="thumbnails">
        {this.props.style.photos.map((photo, key) => (
          <li key={key} id={"slide"+key}>
            <a href={"#slide"+key}>
              <img src={photo.thumbnail_url} />
            </a>
          </li>
        ))}
        </ul> */}


      </div>

    );
  }
}