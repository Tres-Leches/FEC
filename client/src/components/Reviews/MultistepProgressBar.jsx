import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown as carrot } from '@fortawesome/free-solid-svg-icons';

const MultiStepProgressBar = (props) => {
  const selections = {};
  selections.Size = [
    'A size too small',
    '1/2 a size too small',
    'Perfect',
    '1/2 a size too big',
    'A size too big',
  ];
  selections.Width = [
    'Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'A size too wide',
  ];
  selections.Comfort = [
    'Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect',
  ];
  selections.Quality = [
    'Poor',
    'Below average',
    'What I expected',
    'Pretty great',
    'Perfect',
  ];
  selections.Length = [
    'Runs Short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long',
  ];
  selections.Fit = [
    'Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly long',
    'Runs long',
  ];

  console.log('multiprogress', props.value);

  return (
    <div>
      <div className="multiProgressContainer">
        <div
          className="multiProgressSegment"
          style={{ marginRight: `${5}px` }}
        >
          {props.value <= (5 / 3) ? <FontAwesomeIcon icon={carrot} /> : null}
        </div>
        <div
          className="multiProgressSegment"
          style={{ marginRight: `${5}px` }}
        >
          {props.value <= (10 / 3) && props.value > (5 / 3)
            ? <FontAwesomeIcon icon={carrot} /> : null}
        </div>
        <div className="multiProgressSegment">
          {props.value <= (15 / 3) && props.value > (10 / 3)
            ? <FontAwesomeIcon icon={carrot} /> : null}
        </div>
      </div>
      {/* <div>
        <span>
          {selection[props.char][0]}
        </span>
        <span>
          {selection[props.char][2]}
        </span>
        <span>
          {selection[props.char][4]}
        </span>
      </div> */}
    </div>

  );
};

export default MultiStepProgressBar;
