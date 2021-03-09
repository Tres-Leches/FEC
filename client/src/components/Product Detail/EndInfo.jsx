import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

var EndInfo = (props) => (
  <div className="endInfo">
    <div className="slogan">
      <h2>{props.product.slogan}</h2>
      <p>{props.product.description}</p>
    </div>
    <div className="features">
      {props.product.features.map((feature, key)=>(
        <div className="feature" key={key}>
          <FontAwesomeIcon icon={faCheck} className= "featureCheck" aria-hidden="false"/>
          {feature.feature} : {feature.value}
        </div>
      ))}
    </div>
  </div>

)

export default EndInfo;