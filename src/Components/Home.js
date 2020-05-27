import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Component to show info on home page when people first arrive on the site
 */
const Home = () => {
    return (
        <div className="home-page"
            style={{ 'align-items': 'center'}}>
            <h4 className="home-title"> Welcome! </h4>
            <p className="home-body"> This is a forum project for my portfolio.
                The frontend was made with React and Redux, and the backend was made
                with a Postgres server.
                Try out the site and send me a message through Github or any other means
                for problems and bugs that arise.
            </p>
            <h4 className="home-title-small"> Features </h4>
            <div>
                <h4 className="home-list-element"> 1. Can login and register an account </h4>
                <h4 className="home-list-element"> 2. Can create posts and comments under the posts</h4>
                <h4 className="home-list-element"> 3. Can change username and password under settings</h4>
            </div>
            <h4 className="home-title-small"> Links </h4>
            <div>
                <div className="home-link">
                    <h4 className="home-list-element"> Github link: </h4>
                    <a className="home-list-element"
                        href="https://github.com/piolinest123"
                        style={{ 'margin-left': '10px' }}> https://github.com/piolinest123 </a>
                </div>
                <h4 className="home-list-element"> Personal Portfolio: Placeholder </h4>
            </div>
            <div className="home-buttons">
                <NavLink className="header-button" to="/login"
                    style={{ 'margin-right': '20px'}}> Login </NavLink>
                <NavLink className="header-button" to="/register"> Register </NavLink>
            </div>
        </div>
    )
}

export default Home;