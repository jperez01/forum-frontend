import React, { Fragment, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';

/**
 * Component that acts as a register page for the user
 */
const Register = () => {

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmit] = useState(false);
	const [usernameWarning, setUserWarning] = useState(false);
	const [passwordWarning, setPasWarning] = useState(false);
	const [emailWarning, setEmailWarning] = useState(false);

	function onSubmit(e) {
		const body = {
			email: email,
			username: username,
			password: password
		};
		fetch("https://forum-database232.herokuapp.com/users/create", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		}).then(res => {
			setSubmit(true);
		});
	}

	function checkBoxes(e) {
		if (username.localeCompare("") === 0) {
			setUserWarning(true);
			document.getElementById('username').style.border = '1px solid red';
		} else {
			setUserWarning(false);
			document.getElementById('username').style.border = '';
		}

		if (password.localeCompare("") === 0) {
			setPasWarning(true);
			document.getElementById('password').style.border = '1px solid red';
		} else {
			setPasWarning(false);
			document.getElementById('password').style.border = '';
		}

		if (email.localeCompare("") === 0) {
			setEmailWarning(true);
			document.getElementById('email').style.border = '1px solid red';
		} else {
			setEmailWarning(false);
			document.getElementById('email').style.border = '';
		}

		if (!passwordWarning && !usernameWarning && !emailWarning) {
			onSubmit(e);
		}
	}

	return (
			<div className="login">
				<h1 className="page-title"> Register </h1>
				<input 
					id="email"
					onChange={event => setEmail(event.target.value)}
					type="text"
					style={{ 'border': ''}}
					placeholder="Email"
					className="login-input" />
				{ emailWarning && <h4 className="warning"> email box is empty </h4> }
				<input 
					id="username"
					onChange={event => setUsername(event.target.value)}
					type="text"
					style={{ 'border': ''}}
					placeholder="Username"
					className="login-input" />
				{ usernameWarning && <h4 className="warning"> username box is empty </h4> }
				<input 
					id="password"
					onChange={event => setPassword(event.target.value)}
					type="text"
					style={{ 'border': ''}}
					placeholder="Password"
					className="login-input" />
				{ passwordWarning && <h4 className="warning"> password box is empty </h4> }
				{ submitted ? 
					<Redirect to='/login'/>
					:
					<a className="signup-login-button" onClick={checkBoxes}>
						Register
					</a>
				}
				<h4 className="text"> Already have an Account? </h4>
				<NavLink className="text" to="/register"> Login here </NavLink>
			</div>
	);
};

export default Register;