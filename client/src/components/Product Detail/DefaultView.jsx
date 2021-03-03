import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: this.props.style.photos[0],
      currentInd: 0,
    };
    this.changeCurrentPhoto = this.changeCurrentPhoto.bind(this)
  }

  componentDidUpdate(prevProps){
    if(this.props.style !== prevProps.style) this.setState({currentPhoto: this.props.style.photos[0], currentInd: 0})
  }

  changeCurrentPhoto(photo) {
    this.setState({currentPhoto: photo, currentInd: this.props.style.photos.indexOf(photo)});
  }

  arrowChangePhoto(direction) {
    if(direction === 'backward' && this.state.currentInd !== 0) {
      this.changeCurrentPhoto(this.props.style.photos[this.state.currentInd - 1])
    }else if(direction === 'forward' && this.state.currentInd !== this.props.style.photos.length-1) {
      this.changeCurrentPhoto(this.props.style.photos[this.state.currentInd + 1])
    }
  }

  render() {
    return (
      <div className="display">
        <div className="mainDisplay">
          <FontAwesomeIcon icon={faArrowLeft} size='lg' className="leftArrow" onClick={() => {this.arrowChangePhoto('backward')}}/>
          <img src={this.state.currentPhoto.url}/>
          <FontAwesomeIcon icon={faArrowRight} size='lg' className="rightArrow" onClick={() => {this.arrowChangePhoto('forward')}}/>
        </div>
        <FontAwesomeIcon icon={faAngleUp} className="upArrow" onClick={() => {this.arrowChangePhoto('backward')}}/>
        <ul className="thumbnails">
        {this.props.style.photos.map((photo, key) => (
          <li key={key} id={"slide"+key} ><img src={photo.url} className={key===this.state.currentInd ? "clickedThumbnail" : ""} onClick={() => {this.changeCurrentPhoto(photo)}}/> </li>
        ))}
        </ul>
        <FontAwesomeIcon icon={faAngleDown} className="downArrow" onClick={() => {this.arrowChangePhoto('forward')}}/>

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