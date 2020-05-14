import React, { useEffect, useState } from 'react';

const SingleComment = (props) => {
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		setUsername(props.data.username);
		setBody(props.data.body);
	}, [props.data.username, props.data.body]);


	return (
		<div className="full-comment">
			<h4 className="comment-name"> {username} </h4>
			<h4 className="comment-body"> {body} </h4>
		</div>
	);
}

export default SingleComment;