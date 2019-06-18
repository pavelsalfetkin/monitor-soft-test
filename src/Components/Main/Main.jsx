import React from 'react';
import './Main.css';


class Main extends React.Component {

  /**
  |--------------------------------------------------
  | Main - родительский компонент-контейнет для отображения в себе компонентов: Home, Login, Register
  |--------------------------------------------------
  */

  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
      activeMenu: 'about',
    };
  }

  render() {
    // console.log(this.props.children);
    return (
      <div className="main">
        {this.props.children || <h1>Main</h1>}
      </div>
    );
  }
}

export default Main;