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
      filteredQuestions: [],
      searchQuery: '',
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value }, () => {
      this.filterQuestions();
    });
  }

  getQuestions() {
    const productId = 16392; // Placeholder
    axios.get(`/api/qa/questions/${productId}`)
      .then((response) => {
        this.setState({ questions: response.data.results });
      })
      .then(() => { this.filterQuestions(); })
      .catch((err) => console.error(err));
  }

  filterQuestions() {
    const { searchQuery, questions } = this.state;
    let filtered = [];
    if (searchQuery.length >= 3) {
      questions.forEach((question) => {
        const qBody = question.question_body.toLowerCase();
        const query = searchQuery.toLowerCase();
        if (qBody.includes(query)) {
          filtered.push(question);
        }
        // Else search through answers of each question_id.
        // If answer.body, aBody, includes query, return question
      });
    } else {
      filtered = questions;
    }
    this.setState({ filteredQuestions: filtered },
      () => { console.log('filtered: ', this.state.filteredQuestions); });
  }

  render() {
    const { filteredQuestions, searchQuery } = this.state;

    return (
      <div>
        Hello from Questions and Answers
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={this.setSearchQuery}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <QuestionsList questions={filteredQuestions} />
      </div>
    );
  }
}

export default Main;
