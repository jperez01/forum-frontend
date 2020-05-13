import React, { useEffect, useState } from 'react';
import SingularUser from './SingularUser';

const AllUsersPage = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/users", {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		}).then(res => res.json())
		.then(data => {
			setUsers(data);
		});
	});

	return (
		<div>
			{users.map(user => (
				<SingularUser data={user}/>
			))}
		</div>
	);
}

export default AllUsersPage;