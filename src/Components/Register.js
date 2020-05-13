import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function onSubmit(e) {
		const body = {
			email: email,
			username: username,
			password: password
		};
		fetch("http://localhost:5000/users/create", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		}).then(res => {
			return '/login';
		});
	}

	function changeRoute() {
		return '/login';
	}
	return (
		<Fragment>
			<h1 className="text-center mt-5"> Register </h1>
			<form>
				<h3> Email </h3>
				<input 
				onChange={event => setEmail(event.target.value)}
				type="text"
				className="form-control" />
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
				<div
				onClick={onSubmit}>
					<NavLink
					to={changeRoute} > 
						Submit 
					</NavLink>
				</div>
			</form>
		</Fragment>
	);
};

export default Register;