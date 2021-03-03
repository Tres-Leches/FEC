import React from 'react';
import Modal from 'react-bootstrap/Modal';

const QuestionForm = (props) => (
  <form>
  </form>
)

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    };
  }

  render() {
    const formContent = <QuestionForm />;
    const modal = this.props.showModal ? <div>{formContent}</div> : null;

    return (
      <div>
        {modal}
      </div>
    );
  }
}

export default FormModal;