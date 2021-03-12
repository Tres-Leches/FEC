import React from 'react';
import axios from 'axios';


const withTracker = (Component, widget) => (
  class WithTracker extends React.Component {
    constructor(props) {
      super(props)
      this.state={}
      this.postClick = this.postClick.bind(this);
    }
    postClick (e) {
      let newPost = {
        element: e.target.outerHTML,
        widget: widget,
        time: new Date(),
      };
      axios.post('/api/interactions', newPost)
      .catch(err => console.error(err))
    }
    render () {
      return (
        <div onClick={this.postClick}>
          <Component
            {... this.props}
          />
        </div>
      )
    }
  }
)
export default withTracker