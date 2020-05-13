import React, { useEffect, useState } from 'react';
import SingularPost from './SingularPost';
import '../../Root.css';

const AllPostsPage = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (posts.length === 0) {
			fetch("http://localhost:5000/posts", {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		}).then(res => res.json())
		.then(data => {
			setPosts(data);
		});
		}
	});

	return (
		<div className="posts-list">
			<h5 className="posts-title"> Posts </h5>
			{posts.map(post => (
				<SingularPost key={post.author + post.title} data={post}/>
			))}
		</div>
	);
}

export default AllPostsPage;