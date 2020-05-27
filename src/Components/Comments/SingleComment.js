import React, { useEffect, useState } from 'react';

/**
 * Component used for single comments to be put on a list
 * @param props passed in from parent
 */
const SingleComment = (props) => {
	const [username, setUsername] = useState("");
	const [body, setBody] = useState("");

	//Initializes comment info with data sent from a parent component
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