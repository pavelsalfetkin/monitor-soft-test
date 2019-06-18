import React, { Component } from 'react';
import './Item.css';
import './Item-media.css';
import cn from 'classnames';


class Item extends Component {

  /**
  |--------------------------------------------------
    Item - отображает одного юзера из большого списка юзеров пришедших с сервера  
    isShown - состояние отвечающее за отображение компонента и для css анимации
    isActive - отображает кнопку редактирования компонента
    isEditing - активирует режим редактирования компонента
    avatar, first_name, last_name, email, id - необходимые данные для отображения информации о пользователе
  |--------------------------------------------------
  */

  static defaultProps = {
    avatar: "null",
    first_name: "null",
    last_name: "null",
    email: "null",
    id: "null",
  }

  constructor(props) {
    super(props);
    this.state = {
      isShown: true,
      isActive: this.props.isActive || false,
      isEditing: this.props.isEditing || false,
      avatar: this.props.itemData.avatar,
      first_name: this.props.itemData.first_name,
      last_name: this.props.itemData.last_name,
      email: this.props.itemData.email,
      id: this.props.itemData.id,
    };
  }

  /**
  |--------------------------------------------------
  | handleInputChange - во время ввода информации в окне формы, информация сразу помещяется в соответствующее состояние
  |--------------------------------------------------
  */

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  /**
  |--------------------------------------------------
  | activateItem - активирует режим редактирования данных пользователя
  |--------------------------------------------------
  */

  activateItem = (e) => {
    e.preventDefault();
    const isActive = this.state.isActive;
    const isEditing = this.state.isEditing;
    this.setState({ isActive: !isActive });
    isEditing && this.setState({ isEditing: !isEditing });
  }

  /**
  |--------------------------------------------------
    editItem - активирует режим изменения данных пользователя
    и отправляет новые данные в App.js через updateUser()
  |--------------------------------------------------
  */

  editItem = () => {
    const id = this.state.id;
    const updateUser = this.props.updateUser;
    const isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const email = this.state.email;
    updateUser(id, first_name, last_name, email);
  }

  /**
  |--------------------------------------------------
    deleteItem - удаляет пользователя, отправив в App.js необходимый для этого id
    через deleteUser()
  |--------------------------------------------------
  */

  deleteItem = () => {
    const id = this.state.id;
    const deleteUser = this.props.deleteUser;
    const isShown = this.state.isShown;
    this.setState({ isShown: !isShown });
    deleteUser(id);
  }

  /**
  |--------------------------------------------------
    saveNewUser - сохраняет пользователя, отправив в App.js необходимый для этого данные
    через saveNewUser()
  |--------------------------------------------------
  */

  saveNewUser = () => {
    const saveNewUser = this.props.saveNewUser;
    const isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });

    const firstName = this.state.first_name;
    const lastName = this.state.last_name;
    const email = this.state.email;
    saveNewUser(firstName, lastName, email);
    // console.log("Item.js - saveNewUser");
    // console.log("firstName:", firstName);
    // console.log("lastName:", lastName);
    // console.log("email:", email);
  }

  render() {
    const { itemData, isHomePage } = this.props;
    const isEditing = this.state.isEditing;
    const isActive = this.state.isActive;
    const isShown = this.state.isShown;

    // console.log(this.state);
    
    const listItem = cn({
      'list-item': true,
      'show animated fadeInLeft_List': itemData && isShown,
      'active': isEditing,
    });

    const editItem = cn({
      'list-item-menu-edit': true,
      'active': isEditing,
    });

    return (
      <li className={listItem}>
        <img className="list-item-img" src={this.state.avatar} alt="Avatar"/>
        <div className="list-item-text">
          {
            isEditing ? 
            <>
              <div className="list-item-text-name-block">
                <input type="text" className="list-item-text-name1-edit" name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
                <input type="text" className="list-item-text-name2-edit" name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
              </div>
              <input type="text" className="list-item-text-email-edit" name="email" value={this.state.email} onChange={this.handleChange}/>
            </> : 
            <>
              <div className="list-item-text-name-block">
                <span className="list-item-text-name1">{this.state.first_name}</span>
                <span className="list-item-text-name2">{this.state.last_name}</span>
              </div>
              <span className="list-item-text-email">{this.state.email}</span>
            </>
          }
        </div>
        <div className="list-item-menu">
          {isActive && <span className={editItem} onClick={this.editItem}>/</span>}
          {isActive && <span className="list-item-menu-delete" onClick={this.deleteItem}>X</span>}
          {isHomePage === "login" && <span className="list-item-menu-menu" onClick={this.activateItem}>menu</span>}
          {/* {isHomePage === "addUser" && <span className="list-item-menu-menu" onClick={this.activateItem}>menu</span>} */}
          {isHomePage === "createUser" && <span className="list-item-menu-menu" onClick={this.saveNewUser}>save</span>}
        </div>
      </li>
    )
  }
}

export default Item;