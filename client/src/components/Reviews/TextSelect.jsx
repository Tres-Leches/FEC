import PropTypes from 'prop-types';
import React from 'react';
import lodashMap from 'lodash.map';

class TextSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(event) {
    this.props.onChange(event, event.target.value, this.props.options[event.target.value]);
  }

  render() {
    const { options, active, className } = this.props;

    let classes = 'react-textselect';
    if (className) classes += ` ${className}`;

    return (
      <span className={classes}>
        {options[active]}

        <select className="react-textselect-input" onChange={this.handleChange} value={active}>
          {lodashMap(options, (value, key) => (
            <option value={key} key={key}>{value}</option>
          ))}
        </select>
      </span>
    );
  }
}

export default TextSelect;
