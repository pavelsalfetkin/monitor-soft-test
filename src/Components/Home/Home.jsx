import React, { Component } from 'react';
import './Home.css';
import './Home-media.css';
import cn from 'classnames';
import Item from '../Item/Item';


class Home extends Component {

  /**
  |--------------------------------------------------
    Компонент в котором отображаются основные данные.
    Состояния компонента:
    isShow - состояние для анимаци плавного появления окна для css-стилей
    first_name, last_name, email - сюда помещаются необходимые данные при создании нового пользователя
  |--------------------------------------------------
  */

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  componentDidMount() {
    this.setState({ isShow: true });
  }

  componentWillUnmount() {
    this.setState({ isShow: false });
  }

  /**
  |--------------------------------------------------
    homePageStatusSwitcher - принимает данные из атрибута data-home-page-status
    и отправляет их в App.js для изменения глобального состояния,
    после этого отображаются необхдимые элементы в компоненте
  |--------------------------------------------------
  */

  homePageStatusSwitcher = (e) => {
    e.preventDefault();
    // console.log(e.target.dataset.homePageStatus);
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    const status = e.target.dataset.homePageStatus
    isHomePageSwitcher(status);
  }

  /**
  |--------------------------------------------------
    saveNewUser - сохраняет данные нового пользователя в локальное состояние
    и меняет глобальный статус в isHomePageSwitcher()
  |--------------------------------------------------
  */

  saveNewUser = (firstName, lastName, email) => {
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    this.setState({
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
    isHomePageSwitcher("addUser");
    // console.log("Home.js - saveNewUser");
  }

  /**
  |--------------------------------------------------
    addUser - берет данные о новом пользователе из локального состояния
    и отправляет их в App.js через функцию addUser(),
    меняет глобальный статус в isHomePageSwitcher()
  |--------------------------------------------------
  */

  addUser = () => {
    const isHomePageSwitcher = this.props.isHomePageSwitcher;
    const addUser = this.props.addUser;
    const firstName = this.state.first_name;
    const lastName = this.state.last_name;
    const email = this.state.email;
    addUser(firstName, lastName, email);
    isHomePageSwitcher("newUser");
    // console.log("Home.js - addUser");
  }

  render() {
    const { usersList, isHomePage, deleteUser, updateUser } = this.props;
    const isShow = this.state.isShow;

    const newUserData = {
      avatar: "https://api.adorable.io/avatars/88/abott@adorable.png",
      first_name: "New",
      last_name: "User",
      email: "newuser@create.me",
      id: "id",
    };

    const homePage = cn({
      'home-page': true,
      'show animated fadeInLeft_List': isShow,
    });

    const homePageList = cn({
      'home-page-list': true,
      'increase-height': isHomePage === "createUser" || isHomePage === "addUser" || isHomePage === "newUser"
    });

    return (
      <div className={homePage}>
        <div className="home-page-content">
          <h2 className="home-page-title">List of users</h2>
          {
            isHomePage === "logout" &&
            <>
              <span className="home-page-info">Log in to create and edit users</span>
              <ul className="home-page-list">
                {usersList.map(item => <Item key={item.id}
                  itemData={item}
                  isHomePage={isHomePage}
                  deleteUser={deleteUser}
                  updateUser={updateUser}/>)}
              </ul>
            </>
          }
          {
            isHomePage === "login" &&
            <>
              <span className="home-page-info">
                Click to&nbsp;
                <span className="home-page-user-create"
                  onClick={this.homePageStatusSwitcher}
                  data-home-page-status="createUser">create a new user</span>
              </span>
              <ul className="home-page-list">
                {usersList.map(item => <Item key={item.id}
                  itemData={item}
                  isHomePage={isHomePage}
                  deleteUser={deleteUser}
                  updateUser={updateUser}/>)}
              </ul>
            </>
          }
          {
            isHomePage === "createUser" &&
            <>
              <span className="home-page-info">
                Enter data for a new user or&nbsp;
                <span className="home-page-user-create"
                  onClick={this.homePageStatusSwitcher}
                  data-home-page-status="login">сanсel</span>
                &nbsp;the operation
              </span>
              <ul className={homePageList}>
                <Item key={newUserData.id}
                  itemData={newUserData}
                  isHomePage={isHomePage}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  saveNewUser={this.saveNewUser}
                  isEditing={true}
                  isActive={false}/>
                <span className="home-page-list-info">Demo mode add user</span>  
              </ul>
            </>
          }
          {
            isHomePage === "addUser" &&
            <>
              <span className="home-page-info">
                Click to&nbsp;
                <span className="home-page-user-create"
                  onClick={this.addUser}
                  data-home-page-status="newUser">add a new user</span>
                &nbsp;or&nbsp;
                <span className="home-page-user-create"
                  onClick={this.homePageStatusSwitcher}
                  data-home-page-status="login">сanсel</span>
                &nbsp;the operation
              </span>
              <ul className={homePageList}>
                <Item key={newUserData.id}
                  itemData={newUserData}
                  isHomePage={isHomePage}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  confirmNewUser={this.confirmNewUser}
                  isEditing={false}
                  isActive={false}/>
                <span className="home-page-list-info">Demo mode add user</span>  
              </ul>
            </>
          }
          {
            isHomePage === "newUser" &&
            <>
              <span className="home-page-info">
                New user created, cheers!
              </span>
              <ul className={homePageList}>
                <Item key={newUserData.id}
                  itemData={newUserData}
                  isHomePage={isHomePage}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  confirmNewUser={this.confirmNewUser}
                  isEditing={false}
                  isActive={false}/>
                <span className="home-page-list-info">Demo mode add user</span>  
              </ul>
            </>
          }
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Home;