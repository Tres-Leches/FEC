import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
        <div style={{display:"flex"}}>
          <h4 style={this.props.style.sale_price ? {textDecoration: "line-through"} : {textDecoration: "none"}}>${this.props.style.original_price} </h4>
          <h4 style={this.props.style.sale_price ? {visibility: "visible", color:"red"} : {visibility: "hidden"}}>${this.props.style.sale_price}</h4>
        </div>
          <b>Style > </b> {this.props.style.name}
          <div className="circleThumbnails">
          {this.props.styles.map((style, key) => {
            let checkbox;
            this.props.style === style ? checkbox = <FontAwesomeIcon className='style-checkbox' aria-hidden="false" icon={faCheckCircle}/>: checkbox = "";
            return(
              <div className = {this.props.style === style ? "checkbox-wrapper firstCircleThumbnail" : "checkbox-wrapper"} key={key}>
                <img src={style.photos[0].thumbnail_url} onClick={()=> this.props.changeStyle(style)}/>
                {checkbox}
              </div>
            )
          })}
        </div>

      </div>

    );
  }
}