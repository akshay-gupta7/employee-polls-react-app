import  { _getQuestions } from "../../src/util/_DATA";
import { _getUsers } from "../../src/util/_DATA";
import { receiveUsers } from './users';
import { receiveQuestions } from './questions'; 
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getIntitialData } from "../util/serviceAPI";

//const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) =>{
    dispatch(showLoading());
    console.log("show loading");
    return getIntitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      console.log("Here, Initial Data");
      dispatch(hideLoading());
    })
  }
}

export function handleLoginSession(user) {
  return (dispatch) => {
    dispatch(setAuthedUser(user));
  }
}