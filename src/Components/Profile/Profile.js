import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SingularPost from '../Posts/SingularPost';

/**
 * Component to show profile page with info and posts
 */
const Profile = () => {

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [posts, setPosts] = useState([]);

	const login = useSelector(state => {
		return {
			email: state.email,
			username: state.username,
			password: state.password
		}
	});

	useEffect(() => {
		if (username.localeCompare("") === 0) {
			setEmail(login.email);
			setUsername(login.username);
			setPassword(login.password);
			fetch(`http://localhost:5000/posts/${username}`, {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).then(res => res.json())
			.then(data => {
				setPosts(data);
			});
		}
	});

	return (
		<div className="white-box">
			<div className="profile">
				<img className="profile-pic" src="https://i.ibb.co/f4Y7XDt/Profile-Pic.jpg" alt="Profile-Pic" border="0"/>
				<div className="profile-info">
					<h4 className="profile-username"> {username} </h4>
					<h4 className="profile-email"> {email} </h4>
				</div>
			</div>
			<div className="posts-list"
				style={{ margin: '0px' }}>
				<h4 className="posts-title"> Posts </h4>
				{
					posts.map(post => (
					<SingularPost key={post.title} data={post}/>))
				}
			</div>
		</div>
	);
}

export default Profile;