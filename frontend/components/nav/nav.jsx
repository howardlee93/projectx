// nav.jsx

import React from 'react';
import { Link } from 'react-router-dom';


const Nav = ({ currentUser, login, logout, openModal, history }) => {
	const handleLogout = () =>(
		logout().then(()=>(
			history.push("/")
		))
	);

	const sessionLinks = () => (
		<nav className="navbar-container">
	      <div className = "navbar-session">
	        <div className="nav-header">
	          <Link to="/" className="top-bar-logo-link">
	            <h1>TableOpen</h1>
	          </Link>
	          <p> Find Restaurants Near You</p>
	        </div>

	        <div className="nav-session">
	          <button className="btn" onClick={() => openModal('signup')}>Signup</button>
	          
	          <button className="btn" onClick={() => openModal('login')}>Login</button>
	          
	          <button className="btn btn-demo"
	            onClick={() => login({email: "guest@mail.com", password:"password"})}>
	            Demo
	          </button>
	        </div>
	      </div>
	   	</nav>
	);

	const personalGreeting = () => (
	<nav className="navbar-container">
      <div className = "navbar-session">
      <div className="nav-header">
        <Link to="/" className="top-bar-logo-link">
          <h1 className="top-bar-logo-name">TableOpen</h1>
        </Link>
        <p> Find Restaurants Near You</p>
      </div>
        <div className="nav-greeting">
          <h2 className="header-name">Hi, {currentUser.first_name}</h2>
          <Link className="btn" id="btn-profile" to={`/users/${currentUser.id}`}>Profile</Link>
          <button className="btn btn-demo" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
	);

	return (
		currentUser ?
		personalGreeting(currentUser, logout) :
		sessionLinks()
	);
};

export default Nav;
