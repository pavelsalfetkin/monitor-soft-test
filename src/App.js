import React from 'react';
import './App.css';
import * as api from './api';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import Pagination from './Components/Pagination/Pagination';
import Loader from 'react-loader-spinner';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataShown: false,
      isHomePage: "logout",
      isMenu: false,
      usersList: [],
      currentPage: 1,
      usersPerPage: 2,
      totalUsers: null,
      totalPages: null,
      notificationStatus: null,
    };
  }

  componentDidMount = async () => {
    const currentPage = this.state.currentPage;
    const usersPerPage = this.state.usersPerPage;
    const isDataShown = this.state.isDataShown;

    setTimeout( async () => {
      const res = await api.getUsersList(currentPage, usersPerPage);
      this.setState({
        usersList: res.data.data,
        totalUsers: res.data.total,
        totalPages: res.data.total_pages,
        isDataShown: !isDataShown,
      });
      console.log(res);
      this.switchStatusText(res.status);
    }, 2000);
  }

  isHomePageSwitcher = (homePageStatus) => {
    homePageStatus === "logout" && this.setState({ isHomePage: "logout" });
    homePageStatus === "login" && this.setState({ isHomePage: "login" });
    homePageStatus === "createUser" && this.setState({ isHomePage: "createUser" });
    homePageStatus === "addUser" && this.setState({ isHomePage: "addUser" });
    homePageStatus === "newUser" && this.setState({ isHomePage: "newUser" });
  }

  switchStatusText(status) {
    switch(status) {
      case 200:
        console.log("Status - 200");
        this.setState({ notificationStatus: "Data updated" });
        break;
      case 201:
        console.log("Status - 201");
        this.setState({ notificationStatus: "New user created" });
        break;
      case 204:
        console.log("Status - 204");
        this.setState({ notificationStatus: "User deleted" });
        break;
      case 400:
        console.log("Status - 400");
        this.setState({ notificationStatus: "status 400" });
        break;
      case "login":
        console.log("Status - 200");
        this.setState({ notificationStatus: "User logged in" });
        break;
      case "logout":
        console.log("Status - logout");
        this.setState({ notificationStatus: "User logged out" });
        break;
      case "register":
        console.log("Status - register");
        this.setState({ notificationStatus: "User is registered" });
        break;
      default:
        console.log("Default status");
        this.setState({ notificationStatus: "Loading data..." });
        break;
    }
  }

  paginationSwitchPages = async (e) => {
    e.preventDefault();
    const totalPages = this.state.totalPages;
    const action = e.currentTarget.dataset;

    const updateState = (data) => {
      this.setState({
        currentPage: data.page,
        usersList: data.data,
        totalUsers: data.total,
        totalPages: data.total_pages,
      });
    }

    if (action.page) {
      const res = await api.getUsersList(action.page);
      this.switchStatusText(res.status);
      updateState(res.data);
    }
    else if (action.left) {
      const currentPage = this.state.currentPage;
      const newPageNumber = currentPage - 1;

      if (newPageNumber === 0) {
        const res = await api.getUsersList(totalPages);
        this.switchStatusText(res.status);
        updateState(res.data);
      }
      else {
        const res = await api.getUsersList(newPageNumber);
        this.switchStatusText(res.status);
        updateState(res.data);
      }
    }
    else if (action.right) {
      const firstPage = 1;
      const currentPage = this.state.currentPage;
      const newPageNumber = currentPage + 1;
      
      if (newPageNumber > totalPages) {
        const res = await api.getUsersList(firstPage);
        this.switchStatusText(res.status);
        updateState(res.data);
      }
      else {
        const res = await api.getUsersList(newPageNumber);
        this.switchStatusText(res.status);
        updateState(res.data);
      }
    }
  }

  deleteUser = async (id) => {
    console.log("App.js - deleteUser:", id);
    const res = await api.deleteUser(id);
    console.log("App.js - response:", res);
    this.switchStatusText(res.status);
  }

  updateUser = async (id, firstName, lastName, email) => {
    console.log("App.js - updateUser:", id);
    const res = await api.updateUser(id, firstName, lastName, email);
    console.log("App.js - response:", res);
    this.switchStatusText(res.status);
  }

  addUser = async (firstName, lastName, email) => {
    console.log("App.js - addUser:", firstName, lastName, email);
    const res = await api.addUser(firstName, lastName, email);
    console.log("App.js - response:", res);
    this.switchStatusText(res.status);
  }

  login = async (status) => {
    console.log("App.js - login:", status);
    this.switchStatusText(status);
  }

  logout = async (status) => {
    console.log("App.js - logout:", status);
    this.switchStatusText(status);
  }

  register = async (status) => {
    console.log("App.js - register:", status);
    this.switchStatusText(status);
  }

  isMenuSwitcher = () => {
    const isMenu = this.state.isMenu;
    console.log("App.js - isMenu");
    this.setState({ isMenu: !isMenu });
  }

  render() {
    const { isDataShown, isHomePage, usersList, currentPage, totalPages, isMenu, notificationStatus } = this.state;

    console.log("App.js - isHomePage status:", isHomePage);

    return (
      <Router>
        <div className="app-container">
          <Header isHomePage={isHomePage}
            notificationStatus={notificationStatus}
            isHomePageSwitcher={this.isHomePageSwitcher}
            logout={this.logout}
            isMenuSwitcher={this.isMenuSwitcher}/>
          <Main>
            {
              isDataShown ?
              <Route path='/' exact render={(props) => (
                <Home {...props}
                  isHomePage={isHomePage}
                  usersList={usersList}
                  isHomePageSwitcher={this.isHomePageSwitcher}
                  deleteUser={this.deleteUser}
                  updateUser={this.updateUser}
                  addUser={this.addUser}>
                  <Pagination isHomePage={isHomePage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginationSwitchPages={this.paginationSwitchPages}/>
                </Home>
              )}/> :
              <Loader type="ThreeDots" color="#afb1b6" height="48"	width="48"/>
            }
            {
              isMenu &&
              <Menu isHomePage={isHomePage}
              isHomePageSwitcher={this.isHomePageSwitcher}
              logout={this.logout}
              isMenuSwitcher={this.isMenuSwitcher}/>
            }
            <Route path='/login' render={(props) => (
                <Login {...props}
                  isHomePageSwitcher={this.isHomePageSwitcher}
                  login={this.login}>
                </Login>
              )}/>
            <Route path="/register" render={(props) => (
              <Register {...props}
                isHomePageSwitcher={this.isHomePageSwitcher}
                register={this.register}>
              </Register>
            )}/>
          </Main>
        </div>
      </Router>
    );
  }
}

export default App;