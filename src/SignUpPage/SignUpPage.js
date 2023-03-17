import React from "react";
import { Redirect } from "react-router-dom";
import './SignUpPage.css';

const SignUpPage = ({ loggedIn }) => {

    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <form className="sign-up-form">
            <h2>Create an account</h2>
            <input placeholder="First Name" required/>
            <input placeholder="Last Name" required/>
            <input placeholder="Email" required/>
            <input placeholder="Date of Birth" required/>
            <input placeholder="Username" required/>
            <input placeholder="Password" required/>
            <input placeholder="Password" required/>
            <button>Create Account</button>
        </form>
    )
}

export default SignUpPage;