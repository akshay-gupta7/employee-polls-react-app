import Useauthentication from "./Useauthentication";


import { Link } from "react-router-dom";

const QuestionCard = ({ question, user, id }) => {
    return(
        <div className="card-container">
            <Useauthentication/>
            <div className="card-head">
                <div className="card-body">
                    <h4 className="card-name">{user.name}</h4>
                    <p className="card-text">{convertDate(question.timestamp)}</p>
                </div>
                <div className="card-footer">
                    <Link to = {`/questions/${id}`} className = "question-button">Display</Link>
                </div>
            </div>
        </div>

    );
};

function convertDate(timestamp){
    console.log("Converting date");
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0,5) + time.slice(-2) + ' | ' + d.toLocaleTimeString();
}


export default QuestionCard;