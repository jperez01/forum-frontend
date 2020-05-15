import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../Root.css';

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [submitted, setSubmit] = useState(false);
	const [warning, setWarning] = useState(false);

	const username = useSelector(state => {
		return state.username
	});

	function submitPost(e) {
		e.preventDefault();
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
					console.log("Submitting post failed.");
				} else {
					setSubmit(!submitted);
				}
			});
		}
	}
	return (
		<div className="background">
			<div className="createpost">
				<h4 className="page-title"> Create a Post </h4>
				{ warning &&
					<a className="warning"> You must put a title and body </a>
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
						className="like"
						onClick={submitPost}> Submit </a>}
			</div>
		</div>
		);
}

export default CreatePost;