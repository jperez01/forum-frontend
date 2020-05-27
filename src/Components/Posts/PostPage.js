import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import SingleComment from '../Comments/SingleComment';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

/**
 * Page for a full post to show full body, likes, and comments
 */
const PostPage = () => {
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [likes, setLikes] = useState(0);
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const [date, setDate] = useState(0);

	//Uses local redux storage to get logged in username
	const user = useSelector(state => {
		return state.username;
	});

	/**
	 * Uses author and id from url to find the post and its comments
	 */
	useEffect(() => {
		if (author.localeCompare("") === 0) {
			TimeAgo.addLocale(en);
			const time = new TimeAgo('en-US');
			const parsed = queryString.parse(window.location.search);
			fetch(`https://forum-database232.herokuapp.com/posts/${parsed.author}/${parsed.id}`, {
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
				fetch(`https://forum-database232.herokuapp.com/comments/${data[0].post_id}/${data[0].author}`, {
					method: "GET",
					headers: {"Content-Type": "application/json"}
				}).then(res => res.json())
				.then(data => {
					setComments(data);
				});
			});
		}
	});

	function submitComment() {
		if (user !== undefined) {
			const body = {
				username: user,
				post: title,
				post_author: author,
				body: comment
			}
			fetch('https://forum-database232.herokuapp.com/comments/create', {
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
		fetch(`https://forum-database232.herokuapp.com/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		});
		setLikes(amount);
	}

	function submitDislike() {
		const amount = likes - 1;
		fetch(`https://forum-database232.herokuapp.com/posts/${author}/${title}/${amount}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		});
		setLikes(amount);
	}

	return (
			<div className="post-content">
				<h4 className="post-page-title"> {title} </h4>
				<div className="flex-box">
					<NavLink to='/allposts'> Back to Posts</NavLink>
				</div>
				<div className="post-info">
					<h4 className="post-page-author"> {author} </h4>
					<h4 className="post-page-date"> {date} </h4>
					<h4 className="post-page-date"> {`${likes} likes`} </h4>
				</div>
				<h4 className="post-body"> {body} </h4>
				<div className="like-box">
					<a className="like" onClick={submitLike}> Like </a>
					<a className="like" onClick={submitDislike}> Dislike </a>
				</div>
				<textarea
					className="comment-input"
					placeholder="Your opinion?" 
					onChange={event => setComment(event.target.value)}/>
				<button className="signup-login-button"
					style={{ 'font-family':'Rubik Medium', width: '100px' }}
					onClick={submitComment}> Submit </button>
				<hr className="line" />
				{comments.map(comment => (
					<SingleComment key={comment.body + comment.username} data={comment} />))}
			</div>
		);
}

export default PostPage;