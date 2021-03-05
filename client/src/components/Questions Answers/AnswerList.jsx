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
      <div className="answer-wrapper">
        <div className="answer-header">
          A:
        </div>
        {answers.map((answer) => (
          <Answer
            key={answer.answer_id}
            answer={answer}
            getAnswers={getAnswers}
          />
        ))}
        <button type="button" id="load-button" onClick={() => setIsExpand(!isExpand)}>COLLAPSE ANSWERS</button>
      </div>
    );
  }
  return (
    <div className="answer-wrapper">
      <div className="answer-header">
        A:
      </div>
      {initialAns.map((answer) => (
        <Answer
          key={answer.answer_id}
          answer={answer}
          getAnswers={getAnswers}
        />
      ))}
      {isMore
        && <button type="button" id="load-button" onClick={() => setIsExpand(!isExpand)}>LOAD MORE ANSWERS</button>}
    </div>
  );
};

export default AnswerList;
