import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { _saveQuestion, _saveQuestionAnswer } from '../../src/util/_DATA';
import { saveAnswerToUser, saveQuestionToUser } from './users';


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const QUESTION_ANSWER = 'QUESTION_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function questionAnswer({ id, answer, authedUser }) {
  return {
    type: QUESTION_ANSWER,
    id,
    answer,
    authedUser
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(saveQuestionToUser(question));
      dispatch(hideLoading());
    }).catch(e => {
      console.log('Error whilst adding question: ' + e);
    });
  };
}

export function handleAnswer(id, answer, authedUser) {
  return (dispatch, getState) => {
    //const { authedUser } = getState();

    dispatch(showLoading());

    return _saveQuestionAnswer({ qid: id, answer, authedUser }).then(() => {
      console.log('Here in questions.js, Handling answer to question');
      dispatch(questionAnswer({ id, answer, authedUser }));
      dispatch(saveAnswerToUser({ id, answer, authedUser }));
      dispatch(hideLoading());
    });
  };
}