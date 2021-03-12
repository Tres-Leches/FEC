import React from 'react';
import logo from './tresleches.jpg'

const Header = (props) => {
  return (
    <div className="header">
      <img src={logo} alt="logo"/>

    <div className="modeButtons">
      <button className="lightMode" onClick={props.changeMode}>Light</button>
      <button className="darkMode"  onClick={props.changeMode}>Dark</button>
    </div>
    </div>
  )
}

export default Header;