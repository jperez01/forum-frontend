import React from 'react';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Login from './Components/Login';
import CreatePost from './Components/Posts/CreatePost';
import PostPage from './Components/Posts/PostPage';
import Header from './Components/Header';
import Settings from './Components/Profile/Settings';
import AllPostsPage from './Components/Posts/AllPostsPage';
import AllUsersPage from './Components/Users/AllUsersPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loginfo } from './Redux.js';

let store = createStore(loginfo);

function App() {
  return (
    <div className="App">
	    <Provider store={store}>
		    <Router>
		    	<Header />
		    	<Route path='/settings' exact component={Settings} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<Route path='/profile' exact component={Profile} />
				<Route path='/posts' exact component={PostPage} />
				<Route path='/createPost' exact component={CreatePost} />
				<Route path='/allposts' exact component={AllPostsPage} />
				<Route path='/allusers' exact component={AllUsersPage} />
		    </Router>
		</Provider>
    </div>
  );
}

export default App;
