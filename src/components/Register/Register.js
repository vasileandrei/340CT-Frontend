import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import axiosReq from './../../actions/axiosRequests';
import backButton from './images/arrow.png';
import './Register.css';

const zero = 0;
const minLength = 5;
const passLength = 7;

// This is a class that handles the registrationto the website,
// It takes information about the user: username, password, email
class Register extends Component {

    // constctor for the class
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            checkPassword: '',
            email: '',
            appearRegister: true,
            loading: false
        };

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
        if (this.state.username.length > zero && this.state.password.length > zero &&
        this.state.checkPassword.length > zero && this.state.email.length> zero) {
            return true;
        }
    }

    // handle changes in the four fields
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    // handle submiting the form
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.username.length < minLength || this.state.password.length < minLength ||
            this.state.checkPassword.length < minLength || this.state.email.length < minLength) {
            this.setState({
                message: 'Please complete the entire form'
            });
        } else if (this.state.password !== this.state.checkPassword) {
            this.setState({
                message: 'Passwords don\'t match'
            });
        } else if (this.state.password.length < passLength || this.state.checkPassword.length < passLength) {
            this.setState({
                message: 'Passwords too short'
            });
        } else {
            this.setState({
                loading: true
            });
            this.register();
        }
    }

    async register() {
        const messageIndex = 0;
        const redirectIndex = 1;

        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const response = await axiosReq('register', username, password, email);
        this.showFlashMessage();
        this.setState({
            message: response[messageIndex],
            loading: false
        });
        if (response[redirectIndex]) {
            window.location.replace('/loginAndRegister');
        }
    }

    render = () => {
        return (
            <div>
                <CSSTransition
                    in={this.state.appearRegister}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    >
                    <form className="register-form" onSubmit={this.handleSubmit}>
                        <img src={backButton} onClick={this.props.loginRender}
                        alt="back to login button" className="backButton"></img>
                        <FormGroup className="field" controlId="username">
                            <FormControl autoFocus className="input" type="text"
                            placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="field" controlId="password">
                            <FormControl className="input" type="password" placeholder="Password"
                            value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="field" controlId="checkPassword">
                            <FormControl className="input" type="password" placeholder="Password"
                            value={this.state.checkPassword} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="field" controlId="email">
                            <FormControl className="input" type="email" placeholder="Email"
                            value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <SyncLoader
                            sizeUnit={'px'}
                            size={10}
                            color={'rgba(113, 137, 255, 0.9)'}
                            loading={this.state.loading}
                        />
                        <br />
                        <div id="externalMessage" className={this.state.showClass}>{this.state.message}</div>
                        <br />
                        <FormGroup className="submit">
                            <Button type="submit" name="submit" disabled={!this.validateForm} onClick={this.showFlashMessage}>Register</Button>
                        </FormGroup>
                        <br />
                    </form>
                </CSSTransition>
            </div>
        );
    }
}

Register.propTypes = {
    loginRender: PropTypes.func.isRequired
};

export default Register;