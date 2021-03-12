import React from 'react';

class CharRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: '',
    };
    this.selections = {};
    this.selections.Size = [
      'A size too small',
      '1/2 a size too small',
      'Perfect',
      '1/2 a size too big',
      'A size too big',
    ];
    this.selections.Width = [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'A size too wide',
    ];
    this.selections.Comfort = [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect',
    ];
    this.selections.Quality = [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect',
    ];
    this.selections.Length = [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ];
    this.selections.Fit = [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ];
  }

  onRadioSelect(e) {
    this.setState({
      selection: e.target.id,
    }, () => console.log(this.state));
  }

  render() {
    return (
      <div className="charRadio" onChange={this.onRadioSelect.bind(this)}>
        <div className="charRadioTitle">{this.props.charName}</div>
        <div>{this.state.selection}</div>
        <input
          type="radio"
          name={this.props.data.id}
          id={this.selections[this.props.charName][0]}
          value="1"
        />
        <input
          type="radio"
          name={this.props.data.id}
          id={this.selections[this.props.charName][1]}
          value="2"
        />
        <input
          type="radio"
          name={this.props.data.id}
          id={this.selections[this.props.charName][2]}
          value="3"
        />
        <input
          type="radio"
          name={this.props.data.id}
          id={this.selections[this.props.charName][3]}
          value="4"
        />
        <input
          type="radio"
          name={this.props.data.id}
          id={this.selections[this.props.charName][4]}
          value="5"
        />
        <div className="charRadio-labels">
          <span>{this.selections[this.props.charName][0]}</span>
          <span>{this.selections[this.props.charName][4]}</span>
        </div>
      </div>
    );
  }
}

export default CharRadio;
