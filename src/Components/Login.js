import React, {Fragment, useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import {login} from '../Redux.js';
import {useDispatch} from 'react-redux';
import '../Root.css';

/**
 * Component that acts as a login page to access the forum
 */
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [passwordWarning, setPasWarning] = useState(false);
	const [usernameWarning, setUserWarning] = useState(false);

	const dispatch = useDispatch();

	function onSubmit(e) {
		e.preventDefault();
		fetch(`https://forum-database232.herokuapp.com/users/${username}/${password}`, {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		}).then(res => res.json())
		.then(data => {
			if (data.length === 0) {
				console.log("Authentication Failed");
			} else {
				addLoginInfo(data[0]);
				setSubmitted(!submitted);
			}
		});
	}

	//Checks if username and password boxes have been filled in
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

		if (!passwordWarning && !usernameWarning) {
			onSubmit(e);
		}
	}

	//Adds login data to local Redux storage for personalization on the website
	function addLoginInfo(data) {
		let state = {
				username: data.username,
				password: data.password,
				email: data.email,
				loggedIn: true
			}
		dispatch(login(state));
	}

	return (
			<div className="login">
				<h4 className="page-title"> Login </h4>
					<input
						id="username"
						className="login-input"
						onChange={event => setUsername(event.target.value)}
						placeholder="Username"
						style={{ 'border': ''}}
						type="text" />
					{ usernameWarning && <h4 className="warning"> username box is empty </h4> }
					<input 
						id="password"
						className="login-input"
						onChange={event => setPassword(event.target.value)}
						placeholder="Password"
						style={{ 'border': ''}}
						type="text" />
					{ passwordWarning && <h4 className="warning"> password box is empty </h4> }
					{ submitted ? 
						<Redirect to='/profile'/>
						:
						<a className="signup-login-button" onClick={checkBoxes}>
							Login
						</a>
					}
				<h4 className="text"> Don't have an Account? </h4>
				<NavLink className="text" to="/register"> Register here </NavLink>
			</div>);
}

export default Login;