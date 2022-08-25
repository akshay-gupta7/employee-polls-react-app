import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar from '../assets/avatar_3.png'
import { logoutUser } from "../actions/authedUser";

const NavigationBar= ({user, authedUser, dispatch}) => {
    const location = useLocation();
    const navigation = useNavigate();

    const onLogout = () =>{
        dispatch(logoutUser());
        navigation('/login');
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button className="button" type="button">
                  <span className="navbar"></span>
                </button>
                <div className="container" >
                  <ul className="navbar">
                    <li className="navbar-item">
                      <Link className="navbar-link" to="/">Home</Link>
                    </li>
                    <li className="navbar-item">
                      <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                    </li>
                    <li className="navbar-item">
                      <Link className="navbar-link" to="/add">New</Link>
                    </li>
                  </ul>
                  <ul className="header">
                    {authedUser ? (
                      <>
                        <img src={user?.avatarURL} alt={`${authedUser}`} width="8" height="25" style={{ marginRight: "28px" }} />
                        <span style={{ marginRight: "28px" }}>{user?.name}</span>
                      </>
                    ) : null}
                    <li>
                      {authedUser ? (
                        <div onClick={onLogout}>
                          <Link to="/login" className="text">
                            Logout
                          </Link>
                        </div>
                      ) : (
                        <Link to="/login" className="text">Login</Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );

}



const mapStateToProps = ({ authedUser, users }) =>{
    return{
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(NavigationBar);