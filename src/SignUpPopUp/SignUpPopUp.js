import React from "react";
import './SignUpPopUp.css';
import { useHistory } from "react-router-dom";

const SignUpPopUp = ({ signUpPopUpData, hideSignUpPopUp }) => {

    const history = useHistory();

    const navigateToSignUpPage = () => {
        hideSignUpPopUp();
        history.push('/signup');
    }

    const navigateToLogInPage = () => {
        hideSignUpPopUp();
        history.push('/login');
    }

    return (
        <div className="sign-up-pop-up-container">
            <div 
                className="sign-up-pop-up"
                style={{ backgroundColor: signUpPopUpData[1] }}
            >
                <img 
                    className="pop-up-album-image"
                    src={signUpPopUpData[0].albumArt}
                />
                <div className="start-saving-container">
                    <h2 className="pop-up-heading">Sign up for free to start building your Anthology.</h2>
                    <button 
                        className="pop-up-sign-up-button"
                        onClick={navigateToSignUpPage}
                    >Sign up free</button>
                    <p className="pop-up-footer">Already have an account?  <button className="log-in-redirect" onClick={navigateToLogInPage}>Log in</button></p>
                </div>
                <button 
                    className='close-sign-up-modal-button'
                    onClick={hideSignUpPopUp}
                >Close</button>
                <div className="gradient-filter"></div>
            </div>
        </div>
    )
}

export default SignUpPopUp;