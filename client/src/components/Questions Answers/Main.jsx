/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import QuestionsList from './QuestionsList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const productId = 16392; // Placeholder
    axios.get(`/api/qa/questions/${productId}`)
      .then((response) => {
        this.setState({ questions: response.data.results });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { questions } = this.state;

    return (
      <div>
        Hello from Questions and Answers
        <SearchBar />
        <QuestionsList questions={questions} />
      </div>
    );
  }
}

export default Main;
