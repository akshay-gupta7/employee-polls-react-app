import { useState } from "react";

import Useauthentication from "./Useauthentication";
import QuestionCard from "./QuestionCard";

import { connect } from "react-redux";

const Dashboard = ({votedBy, notVotedBy, users}) => {
    const [answerToQuestion, setAnswerToQuestion] = useState(false);
    console.log("Dashboard function reached");
    const handleOnClick = () => {
        setAnswerToQuestion(!answerToQuestion);
    }

    return(
        <div>
            <Useauthentication />
            <button className="button-board" onClick = {handleOnClick}>Display {answerToQuestion ? "Unanswered" : "Answered" } Polls</button>
            {(!answerToQuestion) ? (
                <div className="card-container">
                    <div className="card-head">NewQuestions</div>
                    <div className="card-container">
                        <div className="card-row">
                            {notVotedBy.length ? notVotedBy.map(question =>{
                                return (<QuestionCard key = {question.id} question = {question} user={users[question.author]} id={question.id} />);
                            }): ''}
                        </div>
                    </div>
                </div>
            ): (
                <div className="card-container">
                    <div className="card-head">Answered</div>
                    <div className="card-container">
                        <div className="card-row">
                            {votedBy.length ? votedBy.map(question =>{
                                return (<QuestionCard key = {question.id} question = {question} user={users[question.author]} id={question.id} />);
                            }): ''}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

const mapStatetoProps = ({ authedUser, questions, users}) =>{
    const count = Object.keys(questions).map(question => questions[question]);

    const votedBy = count.filter(question=> 
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
        ).sort((x,y) => y.timestamp - x.timestamp);
    
    const notVotedBy = count.filter(question=> !votedBy.includes(question)
        ).sort((x,y) => y.timestamp - x.timestamp);

    return{
        questions,
        votedBy,
        notVotedBy,
        users
    }
}

export default connect(mapStatetoProps)(Dashboard);