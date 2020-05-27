import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

/**
 * Small Post Component used for lists
 * @param props act as data passed in to create the component
 */
const SingularPost = (props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [clicked, setClicked] = useState(false);
	const [id, setId] = useState("");
	const [date, setDate] = useState(0);

	//Sets up parser to look at a date and format it
	//eg. 5 months ago, 10 days ago, etc
	TimeAgo.addLocale(en);
	const time = new TimeAgo('en-US');


	//Uses props passed in to set the params for the component
	useEffect(() => {
		const dateTime = new Date(Date.parse(props.data.date));
		setTitle(props.data.title);
		setBody(props.data.body);
		setAuthor(props.data.author);
		setDate(time.format(dateTime));
		setId(props.data.post_id);
	}, [props.data.title, props.data.body, props.data.author]);

	//returns the title, body, and author. When div is clicked, it redirects to post page.
	return (
	<div className="singular-post">
		{clicked
			? <Redirect to={`/posts/?author=${author}&id=${id}`} />
			: <div>
				<h4 className="post-title" onClick={event => setClicked(!clicked)}> {title} </h4>
				<h4 className="post-body"> {body} </h4>
				<h4 className="post-author"> Posted by: {author + " " + date} </h4>
			</div>
		}
	</div>);
}

export default SingularPost;