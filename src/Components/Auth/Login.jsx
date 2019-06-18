import React, { Component } from 'react'
import './Login.css';
import './Login-media.css';
import axios from 'axios';
import cn from 'classnames';


class Login extends Component {

  /**
  |--------------------------------------------------
  | isShow - состояние для анимаци плавного появления окна для css-стилей
  |--------------------------------------------------
  */

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

  /**
  |--------------------------------------------------
  | handleInputChange - во время ввода информации в окне формы, информация сразу помещяется в соответствующее состояние
  |--------------------------------------------------
  */

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
  |--------------------------------------------------
    onSubmit - когда необходимые данные введены в форму, отправляем их на сервер,
    если получен положительный ответ от сервера, то функция isHomePageSwitcher()
    меняет глобальное состояние в App.js для отображения нужного компонента.
    Функция login() отправляет статус для уведомления
  |--------------------------------------------------
  */
  
  onSubmit = async (event) => {
    event.preventDefault();
    const { isHomePageSwitcher, login } = this.props;
    const email = this.state.email;
    const password = this.state.password;

    try {
      const res = await axios.post(`https://reqres.in/api/login`, {
        "email": email,
        "password": password,
      });

      // console.log(res);

      if (res.status === 200) {
        this.props.history.push('/');
        isHomePageSwitcher("login");
        login("login");
      } else {
        login(res.status);
        const error = new Error(res.error);
        throw error;
      }
    } catch(e) {
      console.log("error");
    }
  }

  render() {
    const isShow = this.state.isShow;
    // console.log(this.props)

    const loginPage = cn({
      'login-page': true,
      'show animated fadeInLeft_List': isShow,
    });

    return (
      <div className={loginPage}>
        <div className="login-page-content">
          <h2 className="login-page-title">Login</h2>
          <span className="login-page-info">Login to get full access</span>
          <form className="form show" onSubmit={this.onSubmit}>
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
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <input className="form-label-login" type="submit" value="Login"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;