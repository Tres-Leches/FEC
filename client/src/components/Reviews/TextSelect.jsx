import React from 'react';

class TextSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { options, active, className } = this.props;

    let classes = 'react-textselect';
    if (className) classes += ` ${className}`;

    return (
      <span className={classes}>
        {options[active]}

        <select
          className="react-textselect-input"
          onChange={this.props.onTextSelectChange}
          defaultValue={this.props.active}
        >
          {options.map((sortOption, index) => (
            <option
              value={sortOption}
              key={index}
            >
              {sortOption}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

export default TextSelect;
