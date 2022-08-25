import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

const mapStatetoProps = ({ authedUser }) => {
    console.log("Authetication hit")
    return {
        status: authedUser === null ? true : false
    }
}

const Useauthentication = (props) =>{

    const location = useLocation();
    const navigation = useNavigate();

    

    useEffect(() =>{
        const flag = props.status;

        if(flag === true){
            navigation('/login', { state: {location: location.pathname }});
        };
    }, [props.status, location?.pathname, navigation]);

};



export default connect(mapStatetoProps)(Useauthentication);