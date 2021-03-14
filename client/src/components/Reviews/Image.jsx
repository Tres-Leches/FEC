import React from 'react';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        <div
          className="thumbnail-container"
        >
          <img
            className="thumbnail"
            src={this.props.src}
            alt=""
            onClick={this.toggleModal.bind(this)}
          />
        </div>
        {this.state.showModal && (
          <div className="photo-modal">
            <dialog
              className="photo-modal-dialog"
              open
              onClick={this.toggleModal.bind(this)}
            >
              <img
                clssName="photo"
                src={this.props.src}
                onClick={this.toggleModal.bind(this)}
                alt=""
              />
            </dialog>
          </div>
        )}
      </div>
    );
  }
}

export default Image;
