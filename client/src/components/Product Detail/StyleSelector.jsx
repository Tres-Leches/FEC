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
        <div>
          <b>Style > </b> {this.props.style.name}
        </div>
          <div className="circleThumbnails">
          {this.props.styles.map((style, key) => {
            let input;
            this.props.style === style ? input = <input class='style-checkbox' type="checkbox" checked></input> : input = "";
            return(
              <div className ="checkbox-wrapper">
                <img key={key} src={style.photos[0].thumbnail_url} onClick={()=> this.props.changeStyle(style)}/>
              {input}
              </div>

            )
          })}
        </div>

      </div>

    );
  }
}