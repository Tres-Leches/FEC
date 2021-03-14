import React from 'react';

const ProgressBar = (props) => (
  <div>
    {props.starCount}
    {' '}
    <span>
      <div className="progress-bar">
        <div
          data={props.percent}
          className="progress"
          style={{ width: props.percent + '%' }}
        />
      </div>
    </span>
  </div>

);

export default ProgressBar;
