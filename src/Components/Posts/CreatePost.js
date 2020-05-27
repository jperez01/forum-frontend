import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../Root.css';

/*
	Page to create post to the server
*/
const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [submitted, setSubmit] = useState(false);
	const [warning, setWarning] = useState(false);
	const [submitFailed, setSubmitFailed] = useState(false);

	//Uses local redux storage to see the logged in username
	const username = useSelector(state => {
		return state.username
	});


	function submitPost() {
		if (title.localeCompare("") === 0 || body.localeCompare("") === 0) {
			setWarning(true);
		} else {
			let time = Math.round(Date.now() / 1000);
			let bodyText = {
				title: title,
				body: body,
				author: username,
				date: time,
				likes: 0
			};
			fetch(`http://localhost:5000/posts/create`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(bodyText)
			}).then(res => res.json())
			.then(data => {
				if (data.length === 0) {
					setSubmitFailed(!submitFailed);
				} else {
					setSubmit(!submitted);
				}
			});
		}
	}
	return (
		<div className="createpost">
			<h4 className="page-title"> Create a Post </h4>
			{ warning &&
				<a className="warning"> You must put a title and body. </a>
			}
			{ submitFailed &&
				<a className="warning"> The submission failed. Try again after a few minutes. </a>
			}
			<input
				className="createpost-title"
				onChange={event => setTitle(event.target.value)}
				placeholder="Title"/>
			<textarea
				className="createpost-body"
				onChange={event => setBody(event.target.value)}
				placeholder="Text"/>
			{submitted
				? <Redirect to={`/posts/?author=${username}&title=${title}`}/>
				: <a
					className="settings-button"
					style={{ 'align-self': 'center' }}
					onClick={submitPost}> Submit </a>}
		</div>
		);
}

export default CreatePost;