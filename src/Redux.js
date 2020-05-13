export const login = (props) => {
	return {
		type: 'LOGIN',
		username: props.username,
		password: props.password,
		email: props.email,
		loggedIn: true
	}
}
export const logout = (props) => {
	return {
		type: 'LOGOUT',
		username: props.username,
		password: props.password,
		email: props.email,
		loggedIn: false
	}
}

export const loginfo = (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				username: action.username,
				password: action.password,
				email: action.email,
				loggedIn: action.loggedIn
			};
		case 'LOGOUT':
			return {
				username: '',
				password: '',
				email: '',
				loggedIn: action.loggedIn
			};
		default:
			return state;
	}
}