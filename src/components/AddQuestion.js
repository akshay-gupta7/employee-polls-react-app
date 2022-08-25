import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { handleAddQuestion } from "../actions/questions";
import Useauthentication from "./Useauthentication";

const AddQuestion = ({ dispatch, authedUser}) => {
    const [firstOption, setFirstOption] = useState('');
    const [secondOption, setSecondOption] = useState('');
    const [flag, setFlag] = useState(false);
    const [fail, setFail] = useState(false);

    const navigation = useNavigate();

    const handleOnOptionOneChange = e =>{
        setFirstOption(e.target.value);
    }

    const handleOnOptionTwoChange = e =>{
        setSecondOption(e.target.value);
    }

    const handleOnSubmit = e =>{
        e.preventDefault();

        if(firstOption === '' || secondOption === ''){
            setFlag(false);
            setFail(true);
        }else {
            const newQuestion = {
                optionOneText : firstOption,
                optionTwoText: secondOption
            };

            dispatch(handleAddQuestion(newQuestion));
            setFlag(true);
            setFail(false);
            navigation('/');
        }
    }

    return(
        <div>
            <Useauthentication/>
            <h1 className="heading">Would you Rather</h1>
            <h5 className="heading-five">Create your own poll</h5>
            <form onSubmit={handleOnSubmit}>
                <div className="form">
                    <label htmlFor="firstOptionValue" className="form-text"> First Option</label>
                    <input value={firstOption} className="form-value" placeholder="Option One" onChange={handleOnOptionOneChange} required />
                </div>
                <div className="form">
                    <label htmlFor="secondOptionValue" className="form-text"> Second Option</label>
                    <input value={secondOption} className="form-value" placeholder="Option Two" onChange={handleOnOptionTwoChange} required />
                </div>
                <button type ="submit" className="button">Click to Add the Question</button> 
            </form>
        </div>
    )

}

const mapStatetoProps = ({ authedUser }) =>{
    return{
        authedUser
    }
}

export default connect(mapStatetoProps)(AddQuestion);