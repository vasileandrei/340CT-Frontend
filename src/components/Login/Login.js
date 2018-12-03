import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { logout } from './../../actions/authActions';
import axiosReq from './../../actions/axiosRequests';
import PropTypes from 'prop-types';
import user from './images/user.png';
import lock from './images/lock.png';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

const zero = 0;
const minLength = 5;

// This is a class that handles the login to the website, using a username and a password
class Login extends Component {

    // constctor for the class
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: '',
            appearLogin: true,
            show: true,
            showClass: '',
            loading: false
        };

        this.logout = this.logout.bind(this);
        this.showFlashMessage = (event) => this._showFlashMessage(event);
    }

    // eslint-disable-next-line no-unused-vars
    _showFlashMessage = (event) => {
        this.setState({
            show: !this.state.show,
            showClass: (!this.state.show ? 'fadeOut': 'fadeOut2')
        });
    }

    // form check - check for empty username or password
    validateForm = () => {
        if (this.state.username.length > zero && this.state.password.length > zero) {
            return true;
        }
    }

    // handle changes in the two fields
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    // handle submiting the form
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.username.length < minLength || this.state.password.length < minLength) {
            this.setState({
                message: 'Username and password must be valid'
            });
        } else {
            this.setState({
                loading: true
            });
            this.login();
        }
    }

    async login() {
        const messageIndex = 0;
        const redirectIndex = 1;

        const username = this.state.username;
        const password = this.state.password;
        const response = await axiosReq('login', username, password);
        this.setState({
            message: response[messageIndex],
            loading: false
        });
        if (response[redirectIndex] === true) {
            window.location.replace('/shareFile');
        }
    }

    logout = (event) => {
        this.setState({
            message: 'Successfully logged out'
        });
        this.showFlashMessage();
        event.preventDefault();
        this.props.logout();
    }

    render = () => {
        const { isAuthenticated } = this.props.auth;
        let guestLinks =
        <div>
            <Button type="submit" name="submit" disabled={!this.validateForm}
                onClick={this.showFlashMessage}>Login</Button>
            <Button onClick={this.props.registerRender} value="Register" >Register</Button>
        </div>;
        let userLinks =
            <Button onClick={this.logout} value="Logout" >Logout</Button>;

        return (
            <div>
                <CSSTransition
                    in={this.state.appearLogin}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    >
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <FormGroup className="field" controlId="username">
                            <img src={user} alt="login user icon"></img>
                            <FormControl autoFocus className="input" type="text"
                            placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="field" controlId="password">
                            <img src={lock} alt="login lock icon"></img>
                            <FormControl required className="input" type="password"
                            placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <SyncLoader
                            sizeUnit={'px'}
                            size={10}
                            color={'rgba(113, 137, 255, 0.9)'}
                            loading={this.state.loading}
                        />
                        <br />
                        <div id="externalMessage" className={this.state.showClass}>
                            {this.state.message}
                        </div>
                        <br />
                        <FormGroup className="submit">
                            { isAuthenticated? userLinks : guestLinks }
                        </FormGroup>
                        <br />
                        <a href="/">Lost password?</a>
                    </form>
                </CSSTransition>
            </div>
        );
    }
}

Login.propTypes = {
    registerRender: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(Login);