import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { saveQuestion, saveQuestionAnswer } from '../../src/util/serviceAPI';
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

export function questionAnswer({ authedUser, id, answer  }) {
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

    return saveQuestion({
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

export function handleAnswer({id, answer, authedUser}) {
  return (dispatch, getState) => {
    //const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({authedUser: authedUser, qid : id, answer:  answer }).then(() => {
      console.log('Here in questions.js, Handling answer to question');
      dispatch(questionAnswer({ authedUser, id, answer }));
      dispatch(saveAnswerToUser({ authedUser, id, answer }));
      dispatch(hideLoading());
    });
  };
}