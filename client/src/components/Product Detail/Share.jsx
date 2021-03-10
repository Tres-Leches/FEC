import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

var Share = () => (
  <div className="shareIcons">
    <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebookSquare} size="3x" /></a>
    <a href="https://twitter.com/"><FontAwesomeIcon icon={faTwitterSquare} size="3x" /></a>
    <a href="https://www.pinterest.com/"><FontAwesomeIcon icon={faPinterestSquare} size="3x" /></a>
    <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagramSquare} size="3x" /></a>

  </div>

)

export default Share;