import React from 'react';
import { Progress } from 'semantic-ui-react';


const ProgressBar = (props) => (
  <div>
    <Progress
      percent={props.progress.toFixed(0)}
      color='green'
      size='tiny'
    />
  </div>

);

export default ProgressBar;
