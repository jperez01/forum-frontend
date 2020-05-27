import React, { useEffect, useState } from 'react';
import SingularUser from './SingularUser';

/**
 * Component to show all the users in the forum
 */
const AllUsersList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (users.length === 0) {
			fetch("http://localhost:5000/users", {
				method: "GET",
				headers: {"Content-Type": "application/json"}
			}).then(res => res.json())
			.then(data => {
				setUsers(data);
			});
		}
	});

	return (
		<div className="users-list">
			<h4 className="users-title"> Users </h4>
			<h4 className="users-body"> All of the users that registered</h4>
			{users.map(user => (
				<SingularUser key={user.password + user.username} data={user}/>
			))}
		</div>
	);
}

export default AllUsersList;