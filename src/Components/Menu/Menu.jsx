import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';


class Menu extends React.Component {

  /**
  |--------------------------------------------------
    Menu - компонент содержащий в себе ссылки: Home, Login, Register
    отображающиеся в зависимости от глобального состояния isHomePage
    и меняющий это состояние через isMenuSwitcher()
    изменения происходят в App.js
    Компонент отображается в мобильной версии
  |--------------------------------------------------
  */

  /**
  |--------------------------------------------------
    logoutSwitcher, loginSwitcher - меняют глобальное состояние в App.js,
    в зависимости от того, залогинился пользователь или нет,
    isMenuSwitcher() - меняет состояние true/false для отображения или нет
  |--------------------------------------------------
  */

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
            <Link className="menu-menu-home" to="/" onClick={isMenuSwitcher}>Home</Link>
            <Link className="menu-menu-login" to="/login" onClick={isMenuSwitcher}>Login</Link>
            <Link className="menu-menu-register" to="/register" onClick={isMenuSwitcher}>Register</Link>
          </>
        }
        {
          isHomePage === "login" || isHomePage === "createUser" || isHomePage === "addUser" || isHomePage === "newUser" ?
          <>
            <Link className="menu-menu-home" to="/" onClick={this.loginSwitcher}>Home</Link>
            <Link className="menu-menu-login" to="/" onClick={this.logoutSwitcher}>Logout</Link>
          </> : null
        }
      </div>
    );
  }
}

export default Menu;