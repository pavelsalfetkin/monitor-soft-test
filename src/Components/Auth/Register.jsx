import React, { Component } from 'react'
import './Register.css';
import './Register-media.css';
import axios from 'axios';
import cn from 'classnames';


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      email : '',
      password: ''
    };
  }

  componentDidMount() {
    this.setState({ isShow: true });
  }

  componentWillUnmount() {
    this.setState({ isShow: false });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  
  onSubmit = async (event) => {
    event.preventDefault();
    const { isHomePageSwitcher, register } = this.props;
    const email = this.state.email;
    const password = this.state.password;

    try {
      const res = await axios.post(`https://reqres.in/api/register`, {
        "email": email,
        "password": password,
      });

      console.log(res);

      if (res.status === 200) {
        this.props.history.push('/monitor-soft-test/home');
        isHomePageSwitcher("login");
        register("register");
      } else {
        register(res.status);
        const error = new Error(res.error);
        throw error;
      }
    } catch(e) {
      console.log("error");
    }
  }

  render() {
    const isShow = this.state.isShow;
    console.log(this.props)

    const registerPage = cn({
      'register-page': true,
      'show animated fadeInLeft_List': isShow,
    });

    const registerBlock = cn({
      'form show': true,
      // 'show animated fadeInLeft_List': itemData && isShown,
      // 'active': isEditing,
    });

    return (
      <div className={registerPage}>
        <div className="register-page-content">
          <h2 className="register-page-title">Register</h2>
          <span className="register-page-info">Register to create a new account</span>
          <form className={registerBlock} onSubmit={this.onSubmit}>
            <label htmlFor="inputEmail4" className="form-label-email">E-mail:</label>
            <input className="form-input-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="inputEmail4" className="form-label-password">Password:</label>
            <input className="form-input-password"
              type="password"
              name="password"
              placeholder="Enter a new password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <input className="form-label-login" type="submit" value="Сreate a new account"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;