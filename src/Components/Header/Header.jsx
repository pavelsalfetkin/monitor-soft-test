import React from 'react';
import './Header.css';
import './Header-media.css';
import { Link } from 'react-router-dom';


class Header extends React.Component {

  logoutSwitcher = () => {
    const { logout } = this.props;
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    isHomePageSwitcher("logout");
    logout("logout");
  }

  loginSwitcher = () => {
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    isHomePageSwitcher("login");
  }

  render() {
    const notification = this.props.notificationStatus;
    const isHomePage = this.props.isHomePage;
    const isMenuSwitcher = this.props.isMenuSwitcher;

    return (
      <div className="header">
        <div className="header-about">
          <span className="header-about-name">Monitor Soft</span>
          <span className="header-about-info">Users List</span>
        </div>
        <div className="header-notification">
          <span className="header-notification-text">{notification}</span>
        </div>
        <div className="header-menu">
          {
            isHomePage === "logout" &&
            <>
              <Link className="header-menu-home" to="/monitor-soft-test/home">Home</Link>
              <Link className="header-menu-login" to="/monitor-soft-test/login">Login</Link>
              <Link className="header-menu-register" to="/monitor-soft-test/register">Register</Link>
            </>
          }
          {
            isHomePage === "login" || isHomePage === "createUser" || isHomePage === "addUser" || isHomePage === "newUser" ?
            <>
              <Link className="header-menu-home" to="/monitor-soft-test/home" onClick={this.loginSwitcher}>Home</Link>
              <Link className="header-menu-login" to="/monitor-soft-test/home" onClick={this.logoutSwitcher}>Logout</Link>
            </> : null
          }
        </div>
        <div className="header-menu-media">
          <span className="header-menu-media-button" onClick={isMenuSwitcher}>Menu</span>
        </div>
      </div>
    );
  }
}

export default Header;