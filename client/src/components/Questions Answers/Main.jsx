/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import _ from 'underscore';
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
    this.resetSearchQuery = this.resetSearchQuery.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (productId !== prevProps.productId) {
      this.getQuestions();
    }
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value }, () => {
      this.filterQuestions();
    });
  }

  getQuestions() {
    const { productId } = this.props;
    axios.get(`/api/qa/questions/${productId}`)
      .then((response) => {
        const questions = response.data.results;
        questions.sort((a, b) => (
          b.question_helpfulness - a.question_helpfulness
        ));
        this.setState({ questions }, () => {
          this.filterQuestions();
        });
      })
      .catch((err) => console.error(err));
  }

  resetSearchQuery() {
    this.setState({ searchQuery: '' }, () => {
      this.filterQuestions();
    });
  }

  filterQuestions() {
    const { searchQuery, questions } = this.state;
    let filtered = [];
    if (searchQuery.length >= 3) {
      questions.forEach((question) => {
        const query = searchQuery.toLowerCase();
        const qBody = question.question_body.toLowerCase();
        if (qBody.includes(query)) {
          filtered.push(question);
        } else {
          // Else search through answers of each question_id.
          // If answer.body, aBody, includes query, return question
          const { answers } = question;
          Object.keys(answers).forEach((answerId) => {
            const aBody = question.answers[`${answerId}`].body.toLowerCase();
            if (aBody.includes(query)) {
              if (_.findWhere(filtered, aBody) == null) {
                filtered.push(question);
              }
            }
          });
        }
      });
    } else {
      filtered = questions;
    }
    this.setState({ filteredQuestions: filtered });
  }

  render() {
    const { filteredQuestions, searchQuery } = this.state;
    const { productId } = this.props;
    return (
      <div className="qa-main">
        <div className="qa-main-header">
          QUESTIONS AND ANSWERS
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={this.setSearchQuery}
          resetSearchQuery={this.resetSearchQuery}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        <QuestionsList
          questions={filteredQuestions}
          getQuestions={this.getQuestions}
          productId={productId}
        />
      </div>
    );
  }
}

export default Main;
