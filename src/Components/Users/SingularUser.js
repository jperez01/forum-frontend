import React, { useEffect, useState } from 'react';

/**
 * Component to show single user in list
 * @param props is info from parent to populate the component with info
 */
const SingularUser = (props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		setUsername(props.data.username);
		setEmail(props.data.email);
	}, [props.data.username, props.data.email]);

	return (
		<div className="flex-box-column">
			<h4 className="mini-username"> {username} </h4>
			<h4 className="likes"> Likes: 0 </h4>
		</div>);
}

export default SingularUser;