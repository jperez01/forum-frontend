import React, {Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {login} from '../Redux.js';
import {useDispatch} from 'react-redux';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();

	function onSubmit(e) {
		e.preventDefault();
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
		<Fragment>
			<form>
				<h3> Username </h3>
				<input 
				onChange={event => setUsername(event.target.value)}
				type="text"
				className="form-control" />
				<h3> Password </h3>
				<input 
				onChange={event => setPassword(event.target.value)}
				type="text"
				className="form-control" />
				{ submitted ? 
					<Redirect to='/profile'/>
					:
					<button onClick={onSubmit}>
						Submit
					</button>
				}
			</form>
		</Fragment>);
}

export default Login;