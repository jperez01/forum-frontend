import React, {Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {login} from '../Redux.js';
import {useDispatch} from 'react-redux';
import '../Root.css';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [warning, setWarning] = useState(false);
	const dispatch = useDispatch();

	function onSubmit(e) {
		e.preventDefault();
		if (username.localeCompare("") === 0 || password.localeCompare("") === 0) {
			setWarning(!warning);
		} else {
			fetch(`http://localhost:5000/users/${username}/${password}`, {
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
	}

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
		<div className="background">
			<div className="createpost">
			<h4 className="page-title"> Login </h4>
			{ warning && <h4 className="warning"> username or password box is empty </h4> }
				<h3 className="input-header"> Username </h3>
				<input 
				className="login-input"
				onChange={event => setUsername(event.target.value)}
				type="text" />
				<h3 className="input-header"> Password </h3>
				<input 
				className="login-input"
				onChange={event => setPassword(event.target.value)}
				type="text" />
				{ submitted ? 
					<Redirect to='/profile'/>
					:
					<a className="like" onClick={onSubmit}>
						Submit
					</a>
				}
			</div>
		</div>);
}

export default Login;