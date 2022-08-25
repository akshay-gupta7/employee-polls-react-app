import { _getUsers } from "./_DATA";
import { _getQuestions } from "./_DATA";
import { _saveQuestionAnswer } from "./_DATA";
import { _saveQuestion} from "./_DATA";

export function getIntitialData(){
    return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
        users, questions
    }))
}

export function saveQuestion (data){
    return _saveQuestion(data);
}

export function saveQuestionAnswer(data){
    return _saveQuestionAnswer(data);
}