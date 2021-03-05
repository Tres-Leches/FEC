/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Answer from './Answer';

const AnswerList = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const { answers, getAnswers } = props;
  const initialAns = answers.slice(0, 2);
  const isMore = answers.length > 2;

  if (isExpand) {
    return (
      <div className="answerlist-wrapper">
        <div className="answer-header-bodylist-container">
          <div className="answer-header">
            A:
          </div>
          <div className="answer-bodylist">
            {answers.map((answer) => (
              <Answer
                key={answer.answer_id}
                answer={answer}
                getAnswers={getAnswers}
              />
            ))}
          </div>
        </div>
        <button type="button" id="load-button" onClick={() => setIsExpand(!isExpand)}>COLLAPSE ANSWERS</button>
      </div>
    );
  }
  return (
    <div className="answerlist-wrapper">
      <div className="answer-header-bodylist-container">
        <div className="answer-header">
          A:
        </div>
        <div className="answer-bodylist">
          {initialAns.map((answer) => (
            <Answer
              key={answer.answer_id}
              answer={answer}
              getAnswers={getAnswers}
            />
          ))}
        </div>
      </div>
      {isMore
        && <button type="button" id="load-button" onClick={() => setIsExpand(!isExpand)}>LOAD MORE ANSWERS</button>}
    </div>
  );
};

export default AnswerList;
