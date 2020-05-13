import React, { useEffect, useState } from 'react';

const SingularUser = (props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		setUsername(props.data.username);
		setEmail(props.data.email);
	}, [props.data.username, props.data.email]);

	return (
		<div>
			<h4> Username: {username} </h4>
			<h4> Email: {email} </h4>
		</div>);
}

export default SingularUser;