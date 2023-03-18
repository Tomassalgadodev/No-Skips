import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import './SignUpPage.css';

const SignUpPage = ({ loggedIn }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);


    if (loggedIn) {
        return (
            <Redirect to='/' />
        )
    }

    const confirmPasswordMatch = e => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
            setPasswordMatch(e.target.value === passwordConfirm);
        } else {
            setPasswordConfirm(e.target.value);
            setPasswordMatch(e.target.value === password);
        }
    }

    const createNewUser = e => {
        e.preventDefault();

        if (!passwordMatch) {
            // Show the user a message that they must match in the form
            console.log('Passwords must match');
        } else {
            console.log('They match!')
        }
    }

    return (
        <form onSubmit={createNewUser} className="sign-up-form">
            <h2>Create an account</h2>
            <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
            <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
            <input placeholder="Password" value={password} name='password' onChange={confirmPasswordMatch} required/>
            <input placeholder="Password" value={passwordConfirm} onChange={confirmPasswordMatch} required/>
            <button>Create Account</button>
        </form>
    )
}

export default SignUpPage;