import React, { useEffect, useState } from 'react';

const SingleComment = (props) => {
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		setUsername(props.data.username);
		setBody(props.data.body);
	}, [props.data.username, props.data.body]);


	return (
		<div>
			<h4> {username} </h4>
			<h4> {body} </h4>
		</div>
	);
}

export default SingleComment;