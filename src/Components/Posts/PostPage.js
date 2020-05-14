import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import SingleComment from '../Comments/SingleComment';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

const PostPage = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [likes, setLikes] = useState(0);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [date, setDate] = useState(0);

	const user = useSelector(state => {
		return state.username;
	})

	useEffect(() => {
		if (author.localeCompare("") === 0) {
			TimeAgo.addLocale(en);
			const time = new TimeAgo('en-US');
			const parsed = queryString.parse(window.location.search);
			fetch(`http://localhost:5000/posts/${parsed.author}/${parsed.title}`, {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			}).then(res => res.json())
			.then(data => {
				setAuthor(data[0].author);
				setTitle(data[0].title);
				setBody(data[0].body);
				setLikes(data[0].likes);
				const dateTime = new Date(Date.parse(data[0].date));
				setDate(time.format(dateTime));
				fetch(`http://localhost:5000/comments/${data[0].title}/${data[0].author}`, {
					method: "GET",
					headers: {"Content-Type": "application/json"}
				}).then(res => res.json())
				.then(data => {
					setComments(data);
				});
			}).then(() => {
				
			});
		}
	});

	function submitComment(e) {
		e.preventDefault();
		if (user !== undefined) {
			const body = {
				username: user,
				post: title,
				post_author: author,
				body: comment
			}
			fetch('http://localhost:5000/comments/create', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			});
			setComments([...comments, body]);
		} else {
			console.log("Username is empty");
		}
	}

	function submitLike() {
		const amount = parseInt(likes) + 1;
		fetch(`http://localhost:5000/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		});
		setLikes(amount);
	}

	function submitDislike() {
		const amount = likes - 1;
		fetch(`http://localhost:5000/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		});
		setLikes(amount);
	}
	return (
		<div className="background">
			<div className="post-content">
				<h4 className="post-title"> {title} </h4>
				<h4 className="post-body"> {body} </h4>
				<h4 className="post-author"> By: {author +" " + date} </h4>
				<div className="like-box">
					<a className="like" onClick={submitLike}> Like </a>
					<h4 className="like-count"> {likes} </h4>
					<a className="like" onClick={submitDislike}> Dislike </a>
				</div>
				<textarea
					className="comment-input"
					placeholder="Your opinion?" 
					onChange={event => setComment(event.target.value)}/>
				<button className="submit" onClick={submitComment}> Submit </button>
				<hr className="line" />
				{comments.map(comment => (
					<SingleComment key={comment.body + comment.username} data={comment} />))}
			</div>
		</div>
		);
}

export default PostPage;