import React, { useEffect, useState } from 'react';
import SingularPost from './SingularPost';
import AllUsersList from '../Users/AllUsersList';
import { sortByDateOldest, sortByDateEarliest, sortByTitleFirst, sortByTitleLast } from './PostSort';
import '../../Root.css';

/*
	Component used for a page with all the posts and users to view
*/
const DiscoverPage = () => {
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

	//Sorts posts by oldest date and sets clicked icon to be different from the rest
	function OldestDateSort() {
		document.getElementById('oldest').style.background = '#f5f5f5';
    	document.getElementById('newest').style.background = 'none';
    	document.getElementById('ascending').style.background = 'none';
		document.getElementById('descending').style.background = 'none';
		document.getElementById('oldest').style.color = 'black';
		document.getElementById('newest').style.color = '#888';
    	document.getElementById('ascending').style.color = '#888';
		document.getElementById('descending').style.color = '#888';
		setPosts(sortByDateOldest([].concat(posts)));
	}

	//Sorts posts by earliest date and sets clicked icon to be different from the rest
	function EarliestDateSort() {
		document.getElementById('oldest').style.background = 'none';
		document.getElementById('newest').style.background = '#f5f5f5';
    	document.getElementById('ascending').style.background = 'none';
		document.getElementById('descending').style.background = 'none';
		document.getElementById('newest').style.color = 'black';
		document.getElementById('oldest').style.color = '#888';
    	document.getElementById('ascending').style.color = '#888';
		document.getElementById('descending').style.color = '#888';
		setPosts(sortByDateEarliest([].concat(posts)));
	}

	//Sorts posts alphabetically from a to z and sets clicked icon to be different from the rest
	function AscendingSort() {
		document.getElementById('oldest').style.background = 'none';
    	document.getElementById('newest').style.background = 'none';
		document.getElementById('ascending').style.background = '#f5f5f5';
		document.getElementById('descending').style.background = 'none';

		document.getElementById('ascending').style.color = 'black';
		document.getElementById('newest').style.color = '#888';
    	document.getElementById('oldest').style.color = '#888';
		document.getElementById('descending').style.color = '#888';
		setPosts(sortByTitleFirst([].concat(posts)));
	}

	//Sorts posts alphabetically from z to a and sets clicked icon to be different from the rest
	function DescendingSort() {
		document.getElementById('oldest').style.background = 'none';
    	document.getElementById('newest').style.background = 'none';
    	document.getElementById('ascending').style.background = 'none';
		document.getElementById('descending').style.background = '#f5f5f5';
		document.getElementById('descending').style.color = 'black';
		document.getElementById('newest').style.color = '#888';
    	document.getElementById('ascending').style.color = '#888';
		document.getElementById('oldest').style.color = '#888';
		setPosts(sortByTitleLast([].concat(posts)));
	}

	return (
		<div className="discover-page">
			<div className="posts-list-2">
				<h5 className="page-title"
					style={{ 
						'align-self': 'flex-start',
						'margin-bottom': '5px'
						}}> Posts </h5>
				<div className="flex-box">
					<h4 id='oldest' className="sortTag" onClick={OldestDateSort}> Oldest </h4>
					<h4 id='newest' className="sortTag" onClick={EarliestDateSort}> Newest </h4>
					<h4 id='ascending' className="sortTag" onClick={AscendingSort}> Title (Ascending) </h4>
					<h4 id='descending' className="sortTag" onClick={DescendingSort}> Title (Descending) </h4>
				</div>
				{posts.map(post => (
					<SingularPost key={post.author + post.title} data={post}/>
				))}
			</div>
			<AllUsersList />
		</div>
	);
}

export default DiscoverPage;