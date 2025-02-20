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
      currentPhoto: this.props.mainPhoto,
      currentInd: this.props.style.photos.indexOf(this.props.mainPhoto),
      startInd: 0,
      endInd: 0,
    };
    this.changeCurrentPhoto = this.changeCurrentPhoto.bind(this)
  }

  componentDidMount() {
    this.setState({endInd: this.props.style.photos.length >= 7 ? 6 : this.props.style.photos.length -1})
  }

  componentDidUpdate(prevProps){
    if(this.props.style !== prevProps.style) {
      this.setState({
        currentPhoto: this.props.style.photos[0], currentInd: 0,
        startInd: 0,
        endInd: this.props.style.photos.length >= 7 ? 6 : this.props.style.photos.length -1
      },
      () => this.props.changeMainPhoto(this.props.style.photos[0])
      )
    }
    else if(this.props.mainPhoto !== prevProps.mainPhoto) {
      let ind = this.props.style.photos.indexOf(this.props.mainPhoto);
      this.setState({
        currentPhoto: this.props.mainPhoto,
        currentInd: ind,
        startInd: ind > 6 ? ind - 6 : 0,
        endInd: ind > 6 ? ind : 7 > this.props.style.photos.length ? this.props.style.photos.length -1 : 6,
      })
    }
  }

  changeCurrentPhoto(photo) {
    let ind = this.props.style.photos.indexOf(photo);
    let newStart = this.state.startInd;
    let newEnd = this.state.endInd;
    if(ind > this.state.endInd) {
      newStart++;
      newEnd++;
    } else if (ind < this.state.startInd) {
      newStart--;
      newEnd--;
    }
    let changeInd =
    this.setState({
      currentPhoto: photo,
      currentInd: ind,
      startInd: newStart,
      endInd: newEnd
    });
    this.props.changeMainPhoto(photo)
  }

  arrowChangePhoto(direction) {
    if(direction === 'backward' && this.state.currentInd !== 0) {
      this.changeCurrentPhoto(this.props.style.photos[this.state.currentInd - 1])
    }else if(direction === 'forward' && this.state.currentInd !== this.props.style.photos.length-1) {
      this.changeCurrentPhoto(this.props.style.photos[this.state.currentInd + 1])
    }
  }

  render() {
    let thumbnails = [];
    for (let i = this.state.startInd; i <= this.state.endInd; i++) {
      if(this.props.style.photos[i])
      thumbnails.push(this.props.style.photos[i]);
    }
    return (
      <div className="display">
        <div className="mainDisplay">
          <FontAwesomeIcon icon={faArrowLeft} size='2x' className="leftArrow" onClick={() => {this.arrowChangePhoto('backward')}} style={this.state.currentInd === 0 ? {visibility:"hidden"} : {visibility:"visible"}}/>
          <img src={this.state.currentPhoto.url} onClick={this.props.changeView}/>
          <FontAwesomeIcon icon={faArrowRight} size='2x' className="rightArrow" onClick={() => {this.arrowChangePhoto('forward')}} style={this.state.currentInd === this.props.style.photos.length-1 ? {visibility:"hidden"} : {visibility:"visible"}}/>
        </div>
      <div className="thumbnailContainer">
        <FontAwesomeIcon icon={faAngleUp} className="upArrow" size="2x" onClick={() => {this.arrowChangePhoto('backward')}} style={this.state.currentInd === 0 ? {visibility:"hidden"} : {visibility:"visible"}}/>
          <ul className="thumbnails">
          {thumbnails.map((photo, key) => (
            <li key={key} id={"slide"+key} ><img src={photo.thumbnail_url} className={key + this.state.startInd === this.state.currentInd ? "clickedThumbnail" : ""} onClick={() => {this.changeCurrentPhoto(photo)}}/> </li>
          ))}
          </ul>
          <FontAwesomeIcon icon={faAngleDown} className="downArrow" size="2x" onClick={() => {this.arrowChangePhoto('forward')}} style={this.state.currentInd === this.props.style.photos.length-1 ? {visibility:"hidden"} : {visibility:"visible"}}/>
      </div>
      </div>

    );
  }
}