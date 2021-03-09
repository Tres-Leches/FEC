import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

var Share = () => (
  <div className="shareIcons">
    <FontAwesomeIcon icon={faFacebookSquare} size="3x" />
    <FontAwesomeIcon icon={faTwitterSquare} size="3x" />
    <FontAwesomeIcon icon={faPinterestSquare} size="3x" />
    <FontAwesomeIcon icon={faInstagramSquare} size="3x" />

  </div>

)

export default Share;