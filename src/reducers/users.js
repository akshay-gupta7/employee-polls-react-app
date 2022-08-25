import { RECEIVE_USERS } from "../actions/users";
import { SAVE_ANSWER_TO_USER } from "../actions/users";
import { SAVE_QUESTION_TO_USER } from "../actions/users";

export default function users(state = null, action) {
    switch(action.type){
        case RECEIVE_USERS:
        return {
            ...state,
            ...action.users
        };

        case SAVE_ANSWER_TO_USER:
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers:{
                        ...state[action.authedUser].answers,
                        [action.id]: action.answers
                    }
                }
            };
        
        case SAVE_QUESTION_TO_USER:
        return {
            ...state,
            [action.question.author]:{
                ...state[action.question.author],
                questions: state[action.question.author].questions.concat([action.question.id])
            }
        };

        

        default:
            return state;
    }
}