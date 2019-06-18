import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';


class Menu extends React.Component {

  logoutSwitcher = () => {
    const { logout } = this.props;
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    isHomePageSwitcher("logout");
    logout("logout");
  }

  loginSwitcher = () => {
    const isMenuSwitcher = this.props.isMenuSwitcher;
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    isHomePageSwitcher("login");
    isMenuSwitcher();
  }

  render() {
    const isHomePage = this.props.isHomePage;
    const isMenuSwitcher = this.props.isMenuSwitcher;

    return (
      <div className="menu">
        {
          isHomePage === "logout" &&
          <>
            <Link className="menu-menu-home" to="/monitor-soft-test/home" onClick={isMenuSwitcher}>Home</Link>
            <Link className="menu-menu-login" to="/monitor-soft-test/login" onClick={isMenuSwitcher}>Login</Link>
            <Link className="menu-menu-register" to="/monitor-soft-test/register" onClick={isMenuSwitcher}>Register</Link>
          </>
        }
        {
          isHomePage === "login" || isHomePage === "createUser" || isHomePage === "addUser" || isHomePage === "newUser" ?
          <>
            <Link className="menu-menu-home" to="/monitor-soft-test/home" onClick={this.loginSwitcher}>Home</Link>
            <Link className="menu-menu-login" to="/monitor-soft-test/home" onClick={this.logoutSwitcher}>Logout</Link>
          </> : null
        }
      </div>
    );
  }
}

export default Menu;