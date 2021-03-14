/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleShowDialog = this.handleShowDialog.bind(this);
  }

  handleShowDialog() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen }, () => {
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
        document.getElementsByClassName('scroll').overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        document.getElementsByClassName('scroll').overflow = 'unset';
      }
    });
  }

  render() {
    const { photo } = this.props;
    const { isOpen } = this.state;

    // const url = new URL(photo.url);
    // const searchParams = new URLSearchParams(url.search);
    // searchParams.set('w', '300');
    // const thumbnail = url.origin + url.pathname + '?' + searchParams.toString();

    return (
      <div>
        <div className="small-container">
          <img
            className="small-img"
            src={photo.url}
            onClick={this.handleShowDialog}
          />
        </div>
        {isOpen && (
          <div className="img-modal">
            <dialog
              className="img-modal-dialog"
              open
              onClick={this.handleShowDialog}
            >
              <div className="img-modal-body">
                <img
                  className="image"
                  src={photo.url}
                  onClick={this.handleShowDialog}
                />
              </div>
            </dialog>
          </div>

        )}
      </div>
    );
  }
}

export default Image;
