import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage} from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomMore:false,
      backgroundImage: `url(${this.props.mainPhoto.url})`,
      backgroundPosition: '0% 0%',
      currentPhoto: this.props.mainPhoto.url,
      currentInd: this.props.style.photos.indexOf(this.props.mainPhoto),
    };
    this.changePhoto = this.changePhoto.bind(this);
  }

  changeZoom() {
    this.setState({zoomMore: !this.state.zoomMore})
  }

  handleMouseMove(e) {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  changePhoto(photo, direction) {
    if (photo) {
      this.props.changeMainPhoto(photo);
      this.setState({
        currentPhoto: photo.url,
        backgroundImage: `url(${photo.url})`,
        currentInd: this.props.style.photos.indexOf(photo)
      })
    } else {
      if (direction === "forward") {
        this.props.changeMainPhoto(this.props.style.photos[this.state.currentInd +1]);
        this.setState({
          currentPhoto: this.props.style.photos[this.state.currentInd +1].url,
          backgroundImage: `url(${this.props.style.photos[this.state.currentInd +1].url})`,
          currentInd: this.state.currentInd +1
        })
      } else {
        this.props.changeMainPhoto(this.props.style.photos[this.state.currentInd -1]);
        this.setState({
          currentPhoto: this.props.style.photos[this.state.currentInd -1].url,
          backgroundImage: `url(${this.props.style.photos[this.state.currentInd -1].url})`,
          currentInd: this.state.currentInd -1
        })
      }
    }
  }

  render() {
    return (
      <div className="expandedView">
          {this.state.zoomMore ?
            <div className="zoomedContainer">
              <div className="zoomedImgContainer" onClick={this.changeZoom.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} style={{backgroundImage: this.state.backgroundImage, backgroundPosition:this.state.backgroundPosition}}>
              </div>

            </div>
          :
            <div style={this.props.isDark ? {background:"#121212"} : {background:"white"}}>
              <div className="expandedViewIcons">
                {this.props.style.photos.map((photo, key) =>
                  <FontAwesomeIcon key={key} icon={faImage} size="2x"
                    style = {this.state.currentInd === key ? {color: "burlywood"}: {color: "indianred"}}
                    onClick={() => {this.changePhoto(photo)}}/>
                )}
              </div>
              <div className="expandedImgContainer">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" className="expandedLeftArrow" style={this.state.currentInd === 0 ? {visibility:"hidden"} : {visibility:"visible"}} onClick={() => {this.changePhoto(null, "backward")}}/>
                <img src={this.state.currentPhoto} onClick={this.changeZoom.bind(this)}/>
                <FontAwesomeIcon icon={faArrowRight} size="2x" className="expandedRightArrow" style={this.state.currentInd === this.props.style.photos.length-1 ? {visibility:"hidden"} : {visibility:"visible"}} onClick={() => {this.changePhoto(null, "forward")}}/>
                <FontAwesomeIcon icon={faTimesCircle} size="2x" className="closeIcon" onClick={this.props.changeView}/>
              </div>

            </div>

          }

      </div>
    );
  }
}