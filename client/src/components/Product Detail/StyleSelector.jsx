import React from 'react';

export default class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: [],

    };
  }


  render() {
    return (
      <div>
        <b>Style > </b> {this.props.style.name} <br />
        {this.props.styles.map((style, key) => (
          <img key={key} src={style.photos[0].thumbnail_url} />
        ))}
      </div>

    );
  }
}