import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux.js';
import { Navbar, Dropdown } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import '../Root.css';

/**
 * Component used for the header with various functions
 */
const Header = () => {
	const [username, setUsername] = useState("");
	const [search, setSearch] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [shown, setShown] = useState(false);
	const [profilevisibility, setprofvis] = useState(false);
	const [settingsvisibility, setsettvis] = useState(false);
	const [logoutvisibility, setlogvis] = useState(false);
	const [loggedOut, setLoggedOut] = useState(false);
	const dispatch = useDispatch();

	const login = useSelector(state => {
		return {
			username: state.username,
			loggedIn: state.loggedIn
		}
	})

	//Sets loggedIn status to toggle different behavior
	useEffect(() => {
		setUsername(login.username);
		setLoggedIn(login.loggedIn);
	});

	function submitLogout() {
		let state = {
			username: "",
			password: "",
			email: "",
			loggedIn: false
		}
		setLoggedOut(true);
		dispatch(logout(state));
		setlogvis(false);
		setShown(!shown);
	}

	return (
		<div className="header">
  			<h4 className="header-title"> Forum </h4>
  			{
  				loggedIn
  				? 
				  <div className="flex-box-right">
						<input className="search-box" type="search" placeholder="Search..."></input>
					<div className="header">
						<NavLink
							className="header-link"
							to="/discover"> Discover </NavLink>
						<NavLink className="header-button" to="/createPost">
							Create Post
						</NavLink>
						<div className="dropdown">
							<div className="header-profile">
								<button onClick={() => setShown(!shown)} className="dropdown-button">
								<img className="profile-icon" src="https://i.ibb.co/44VdKx6/Profile-Icon-V3.png" alt="Profile-Icon-V2" border="0"/>
								{shown
									? <img src="https://i.ibb.co/pLZrgCz/dropdown-arrow2-512.png" alt="Dropdown-Down" height="15px" width="15px" className="dropdown-pic" />
									: <img src="https://i.ibb.co/qk9Q09h/Dropdown-Up.png" alt="Dropdown-Up" height="15px" width="15px" className="dropdown-pic" />
								}
								</button>
							</div>
							<div className="dropdown-content" style={{visibility: shown ? "visible" : "hidden"}}>
								<NavLink className="dropdown-element" to="/profile" style={{visibility: shown ? "visible" : "hidden"}} > 
								Profile </NavLink>
								<NavLink className="dropdown-element" to="/settings" style={{visibility: shown ? "visible" : "hidden"}}> 
								Settings </NavLink>
								<a className="dropdown-logout" style={{visibility: shown ? "visible" : "hidden"}} onClick={submitLogout}>
								Log Out </a>
							</div>
						</div>
					</div>
				</div>
  				: <div className="flex-box-right">
  					<NavLink className="header-link" to="/login"> Login </NavLink>
  					<NavLink className="header-link" to="/register"> Register </NavLink>
  				</div>
  			}
  			{ loggedOut && <Redirect to="/" /> }
		</div>)
}

export default Header;