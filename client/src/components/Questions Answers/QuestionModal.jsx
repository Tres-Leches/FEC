import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const QuestionForm = () => (
  <Form>

  </Form>
)

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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

export default QuestionModal;