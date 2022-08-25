import { useNavigate, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
//import { CallRouter } from "../util/callRouter";

import Useauthentication from "./Useauthentication";

import avatar from '../assets/avatar_4.png'

import DisplayErrorPage from "./DisplayErrorPage";
import { handleAnswer } from "../actions/questions";
//import Useauthentication from "./Useauthenticn";

const QuestionDetail = ({ question, dispatch, id, authedUser }) => {
    const navigation = useNavigate();
	if (question === null) {
		return (
            <>
            <Useauthentication />
			<DisplayErrorPage />
            </>
		);
	};
    
	const handleOnClick = (answer) => {
        console.log("The answer, qid and autheduser is ", answer, id , authedUser );
        dispatch(handleAnswer({id, answer, authedUser}));
		//dispatch(handleAnswer({ id, answer, authedUser}));


		navigation(`/questions/${id}`);
	};

    const {
		name,
        optionOneText,
        optionTwoText,
        hasAnswer,
        voteSelected,
        totalVotes,
        optionOnePercent,
        optionTwoPercent,
	} = question;


	return (
		<div className="container-question">
			<Useauthentication />
			<div className="text">
				Question by {name}
				<img src={avatar} className="avatar" alt="Image" />
			</div>
			<div className="text">
				<h6>Would you rather</h6>
				{hasAnswer ? (
					<div>
						<span>You have already answered this question.</span>
            <p>Your choice: <button className="button" type="button" disabled>{voteSelected}</button></p>
            <hr />
            <h4>Vote Selected:</h4>
            <p>Option One: <button className="button" type="button" disabled>{optionOneText}</button></p>
            <p>Option Two: <button className="button" type="button" disabled>{optionTwoText}</button></p>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Option</th>
                                    <th scope="col">Count of Selected by</th>
									<th scope="col">Percent</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>{optionOneText}</td>
                                    <td>Selected by {Math.round((optionOnePercent * totalVotes)/100)} out of {totalVotes}</td>
									<td>{optionOnePercent}%</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>{optionTwoText}</td>
                                    <td>Selected by {Math.round((optionTwoPercent * totalVotes)/100)} out of {totalVotes}</td>
									<td>{optionTwoPercent}%</td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td>TOTAL VOTES</td>
									<td>{totalVotes}</td>
								</tr>
							</tbody>
						</table>
					</div>
				) : (
					<div className="question-card">
						<span>Click on one of the following two options</span>
						<button className="button" type="button" onClick={() => handleOnClick('optionOne')}>{optionOneText}</button>
						<button className="button" type="button" onClick={() => handleOnClick('optionTwo')}>{optionTwoText}</button>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {

    console.log("I am here333");
        console.log(props);
	const { id } = props.router.params;
	const question = questions[id];

	return {
		authedUser,
		id,
		question: question ? convertQuestion(question, users[question.author], authedUser) : null
	};
};

function convertQuestion(question, author, authedUser){
    let hasAnswer = false;
    let isAuthor = false;
    let voteSelected = '';
    console.log("Convert fuction hit")

    const {
        id,
        timestamp,
        optionOne: {
        votes: [],
        text: optionOneText,
        },
        optionTwo: {
        votes: [],
        text: optionTwoText,
        }
    } = question;

    if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
        hasAnswer = true;
        if (question.optionOne.votes.includes(authedUser)) {
        voteSelected = question.optionOne.text;
        } else if (question.optionTwo.votes.includes(authedUser)) {
        voteSelected = question.optionTwo.text;
        };
    };

    if (author === authedUser) {
        isAuthor = true;
    };

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOnePercent = Math.round((optionOneVotes / totalVotes) * 100);
    const optionTwoPercent = Math.round((optionTwoVotes / totalVotes) * 100);

    return {
        id,
        timestamp,
        name: author.name,
        avatarURL: author.avatarURL,
        optionOneText,
        optionTwoText,
        hasAnswer,
        voteSelected,
        isAuthor,
        totalVotes,
        optionOnePercent,
        optionTwoPercent
    };
};

export const CallRouter = (Component) =>{
    console.log("I am here2");
    console.log(Component);
   
    const ComponentWithRouterProp = (props) => {
        console.log("I am here");
        console.log(props);
        const location = useLocation();
    const navigation = useNavigate();
    const params = useParams();    
        return <Component {...props} router={{ location, navigation, params }} />;
  };

  return ComponentWithRouterProp;
};


export default CallRouter(connect(mapStateToProps)(QuestionDetail));