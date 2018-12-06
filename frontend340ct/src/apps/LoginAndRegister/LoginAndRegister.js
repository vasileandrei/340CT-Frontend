import React, {Component} from 'react';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

import './LoginAndRegister.css';

class LoginAndRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'login'
    };
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }

  handleRegisterClick = () => {
    if (this.state.currentView !== 'login') {
      return;
    }
    this.setState({
      currentView: 'register'
    });
  }

  showLogin = () => {
    this.setState({
      currentView: 'login'
    });
  }

  render = () => {
    let whatToRender;
    if (this.state.currentView === 'login') {
      whatToRender = <Login onClick={this.showLogin} registerRender={this.handleRegisterClick} />;
    } else if (this.state.currentView === 'register') {
      whatToRender = <Register onClick={this.handleRegisterClick} loginRender={this.showLogin} />;
    }
    return (
      <div className="LoginAndRegister">
        {whatToRender}
      </div>
    );
  }
}

export default LoginAndRegister;
