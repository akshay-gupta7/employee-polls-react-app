import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import { useLocation, useNavigate } from 'react-router-dom';

const mapStatetoProps = (state) =>{
    const users = state.users;
    

    return {
        Ids: Object.keys(users),
        users
    };
};

const LoginPage = ({Ids, users, dispatch}) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [logIn, setLogIn] = useState(false);
    const [fail, setFail] = useState(false);

    const location = useLocation();
    const navigation = useNavigate();

    console.log(users);
    console.log("At login page main func")

    const handleOnSubmit = e =>{
        e.preventDefault();
        setLogIn(true);
        setFail(false);
        console.log("Supposed to be logged in")
        navigation('/');
    }

    const handleChange = e => {
        e.preventDefault();
        console.log("Reaching here");
        setSelectedUser(e.target.value);

        if(e.target.value === 'none' || e.target.value === '')
        {
            dispatch(setAuthedUser(''));
            console.log("Success")
            navigation('/login');
        }else{
            dispatch(setAuthedUser(e.target.value));
            console.log("User selected");
            console.log(location);
            navigation(location?.state?.location);
        }
    }

    return(
        <div className = "landing-login-page">
            <form onSubmit={handleOnSubmit}>
                <select name = 'users' onChange={handleChange} className = "form-dropdown-select" defaultValue={selectedUser}>
                    <option value='none' key='none'></option>
                    {Ids.map(id => {
                        console.log("Hi");
                        return(
                               <option value = {id} key={id}>{users[id].name}</option>
                        );
                    })};
                </select>

                <button type="submit" className="login-button" disabled = {selectedUser === ''}>Login</button>
            </form>
        </div>
    )


}

//export default LoginPage;
export default connect(mapStatetoProps)(LoginPage);

/*function Login(){
    return(
        <div className="landing-login-page">
            <div className="credential-container">
                <label for="username"><b>Username</b></label>
                <br></br>
                <input type="text" placeholder="Enter Username" name="username" required />

                <br></br>
                <br></br>
                <label for="pwd"><b>Password</b></label>
                <br></br>
                <input type="text" placeholder="Enter Password" name="pwd" required />

                <br></br>
                <br></br>
                <button type="submit">Login</button>
            </div>
        </div>
    )
}

*/