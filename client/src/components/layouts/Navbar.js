import React, { useContext } from 'react';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { logoutUser, clearError, userAuth, user } = useContext(AuthContext);

  const handleLogout = () => {
      logoutUser();
      clearError();
  }


  const userLinks = (
    <React.Fragment>
      <li>Hello, {user && user.name}</li>
        <span className="sm-hide">|</span>
        <li>
          <a href="#!" onClick={handleLogout}>
            <span className="sm-hide">Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  );

  return (
    <div className="navbar">
      <div className="logo">
        <h1><i className='fas fa-glass-cheers' />
          Event Planner
        </h1>
      </div>
      <ul>
        {userAuth ? userLinks : authLinks}
      </ul>
    </div>
  )
}

export default Navbar