import React from 'react';
import axios from 'axios';


export default class Interactions extends React.Component {
  state = {widget:"Interactions"}
  postClick = (e, widget) => {
    console.log('widget', widget)
    this.setState({widget})
    console.log(e,e.target, e.target.className)
    // console.log(e.target.outerHTML)
    // console.log('element:', this.element.current)
    // let newPost = {
    //   element: e.target.outerHTML,
    //   widget: e.target.className,
    //   time: new Date(),
    // };
    // axios.post('/api/interactions', newPost)
    // .then((data)=> console.log(data))
    // .catch(err => console.error(err))
  }
  render () {

    return (
      <div onClick={(e) => {this.postClick(e, this.state.widget)}}>
        {this.props.render(this.postClick)}
      </div>
      // <div onClick={this.postClick}>
      //   {this.props.render(this.postClick)}
      // </div>
    )
  }
}