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
			}).then(() => {
				fetch(`http://localhost:5000/comments/${title}/${author}`, {
					method: "GET",
					headers: {"Content-Type": "application/json"}
				}).then(res => res.json())
				.then(data => {
					setComments(data);
				});
			});
		}
	});

	function submitComment(e) {
		e.preventDefault();
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
		}).then(res => res.json())
		.then(data => {
			setComments([...comments, data]);
		});
	}

	function submitLike() {
		const amount = parseInt(likes) + 1;
		fetch(`http://localhost:5000/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		}).then(res => res.json())
		.then(data => {
			setLikes(amount);
		})
	}

	function submitDislike() {
		const amount = likes - 1;
		fetch(`http://localhost:5000/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		}).then(res => res.json())
		.then(data => {
			setLikes(amount);
		})
	}
	return (
		<div>
			<h4> Author: {author} </h4>
			<h4> Title: {title} </h4>
			<h4> Body: {body} </h4>
			{comments.map(comment => (
				<SingleComment key={comment.body + comment.username} data={comment} />))}
			<h4> Likes: {likes} </h4>
			<h4> { date } </h4>
			<button onClick={submitLike}> Like </button>
			<button onClick={submitDislike}> Dislike </button>
			<input 
				placeholder="New Comment" 
				onChange={event => setComment(event.target.value)}/>
			<button onClick={submitComment}> Submit </button>
		</div>
		);
}

export default PostPage;