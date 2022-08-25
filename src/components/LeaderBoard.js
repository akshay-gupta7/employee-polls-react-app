import { connect } from "react-redux";
import Useauthentication from "./Useauthentication";

import avatar from '../assets/avatar_4.png'

const LeaderBoard = ({ users }) => {
  const rank = users.sort((x, y) => y.totalScore - x.totalScore);

  return (
    <div className="ldboard-container">
      <Useauthentication />
      <h1 className="text">Leader Board</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered Questions</th>
            <th scope="col">Created Questions</th>
          </tr>
        </thead>
        <tbody>
          {rank.map(user => {
            return (
              <tr key={user.id}>
                {console.log(user.avatarURL)}
                <td>
                  <img src={`${avatar}`} className="avatar-icon" alt={`${user.id}`} width='28' height='20' />
                  {user.name}
                </td>
                <td>
                  {Object.keys(user.answers).length}
                </td>
                <td>{user.questions.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const rankList = Object.values(users);

  rankList.map(user => (user.totalScore = Object.keys(user.answers).length + user.questions.length));

  return {
    users: rankList
  };
};



export default connect(mapStateToProps)(LeaderBoard);