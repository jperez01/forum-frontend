import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

const SingularPost = (props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [clicked, setClicked] = useState(false);
	const [id, setId] = useState("");
	const [date, setDate] = useState(0);

	TimeAgo.addLocale(en);
	const time = new TimeAgo('en-US');
	useEffect(() => {
		const dateTime = new Date(Date.parse(props.data.date));
		setTitle(props.data.title);
		setBody(props.data.body);
		setAuthor(props.data.author);
		setDate(time.format(dateTime));
		setId(props.data.post_id);
	}, [props.data.title, props.data.body, props.data.author]);

	return (
	<div className="singular-post" onClick={event => setClicked(!clicked)}>
		{clicked
			? <Redirect to={`/posts/?author=${author}&id=${id}`} />
			: <div>
				<h4 className="post-title"> {title} </h4>
				<h4 className="post-body"> Body: {body} </h4>
				<h4 className="post-author"> Posted by: {author + " " + date} </h4>
			</div>
		}
	</div>);
}

export default SingularPost;