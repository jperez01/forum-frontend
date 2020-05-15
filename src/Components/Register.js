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
		<div className="background">
			<div className="createpost">
				<h1 className="page-title"> Register </h1>
				<form>
					<h3 className="input-header"> Email </h3>
					<input 
					onChange={event => setEmail(event.target.value)}
					type="text"
					className="login-input" />
					<h3 className="input-header"> Username </h3>
					<input 
					onChange={event => setUsername(event.target.value)}
					type="text"
					className="login-input" />
					<h3 className="input-header"> Password </h3>
					<input 
					onChange={event => setPassword(event.target.value)}
					type="text"
					className="login-input" />
					<div
					onClick={onSubmit}>
						<NavLink
						style={{'text-decoration': 'none'}}
						className="like"
						to={changeRoute} > 
							Submit 
						</NavLink>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;