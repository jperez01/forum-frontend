import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux.js';
import { Navbar, Dropdown } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import '../Root.css';

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
		<Navbar bg="light" expand="lg" className="flex-box">
  			<Navbar.Brand className="logo">Forum</Navbar.Brand>
  			<div className="flex-box-left">
  				<input type="search" className="form-control" placeholder="Search"></input>
  			</div>
  			{
  				loggedIn
  				? 
  				<div className="flex-box-right">
  					<NavLink className="header-button" to="/createPost">
		  				Create Post
		  			</NavLink>
		  			<NavLink className="header-button" to="/allposts">
		  				Posts
		  			</NavLink>
	  				<div className="dropdown">
	  					<div className="flex-box">
	  						<button onClick={() => setShown(!shown)} className="dropdown-button"> {username}
	  						{shown
	  							? <img src="https://i.ibb.co/pLZrgCz/dropdown-arrow2-512.png" alt="Dropdown-Down" height="23px" width="23px" className="dropdown-pic" />
	  							: <img src="https://i.ibb.co/qk9Q09h/Dropdown-Up.png" alt="Dropdown-Up" height="23px" width="23px" className="dropdown-pic" />
	  						}
							</button>
						</div>
						<div className="dropdown-content" style={{visibility: shown ? "visible" : "hidden"}}>
	  						<NavLink className="dropdown-element" to="/profile" style={{visibility: shown ? "visible" : "hidden"}} onMouseOver={event => setprofvis(true)} onMouseOut={event => setprofvis(false)}> 
							{
  								profilevisibility
  								? <img className="dropdown-picture" src="https://i.ibb.co/ZBQnHLv/Profile-Hover.png" alt="Profile-Hover" border="0" />
  								: <img className="dropdown-picture" src="https://i.ibb.co/wdMzbgy/Profile-Normal.png" alt="Profile-Normal" border="0" />
  							}
	  						Profile </NavLink>
  							<NavLink className="dropdown-element" to="/settings" style={{visibility: shown ? "visible" : "hidden"}} onMouseOver={event => setsettvis(true)} onMouseOut={event => setsettvis(false)}> 
  							{
  								settingsvisibility
  								? <img className="dropdown-picture" src="https://i.ibb.co/M1CvybQ/Settings-Hover.png" alt="Settings-Hover" border="0"/>
  								: <img className="dropdown-picture" src="https://i.ibb.co/R6MrKbw/Settings-Normal.png" alt="Settings-Normal" border="0"/>
  							}
  							Settings </NavLink>
  							<a className="dropdown-logout" style={{visibility: shown ? "visible" : "hidden"}} onMouseOver={event => setlogvis(true)} onMouseOut={event => setlogvis(false)} onClick={submitLogout}>
  							{
  								logoutvisibility
  								? <img className="dropdown-picture" src="https://i.ibb.co/Rb7k3pG/Logout-Hover.png" alt="Logout-Hover" border="0"/>
  								: <img className="dropdown-picture" src="https://i.ibb.co/hBVQFRn/Logout-Normal.png" alt="Logout-Normal" border="0"/>
  							}
  							Log Out </a>
  						</div>
	  				</div>
	  			</div>
  				: <div className="flex-box-right">
  					<NavLink className="header-button" to="/login"> Login </NavLink>
  					<NavLink className="header-button" to="/register"> Register </NavLink>
  				</div>
  			}
  			{ loggedOut ?
  				<Redirect to="/" />
  				: <div>
  				</div>
  			}
		</Navbar>)
}

export default Header;