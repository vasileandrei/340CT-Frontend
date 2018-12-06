import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import pencil from './images/pencil.png';
import './Profile.css';

const zero = 0;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameDisplay: false,
            email: '',
            emailDisplay: false,
            appearProfile: true,
            loading: false,
            message: ''
        };
        this.showFlashMessage = (event) => this._showFlashMessage(event);
    }


    // eslint-disable-next-line no-unused-vars
    _showFlashMessage = () => {
        this.setState({
          show: !this.state.show,
          showClass: (!this.state.show ? 'fadeOut': 'fadeOut2')
        });
    }

    validateForm = () => {
        if (this.state.fullName.length > zero && this.state.email.length > zero &&
        this.state.inputMessage.length > zero) {
            return true;
        }
    }

    // handle changes in the three fields
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.usernameDisplay && this.state.emailDisplay) {
            if (this.state.username.length > zero && this.state.email.length > zero){
                this.setState({
                    loading: true
                });
                this.submit();
            } else {
                this.setState({
                    message: 'Please complete both fields'
                });
            }
        } else if (this.state.usernameDisplay) {
            if (this.state.username.length > zero){
                this.setState({
                    loading: true
                });
                this.submit();
            } else {
                this.setState({
                    message: 'Please complete the username field'
                });
            }
        } else if (this.state.emailDisplay) {
            if (this.state.email.length > zero){
                this.setState({
                    loading: true
                });
                this.submit();
            } else {
                this.setState({
                    message: 'Please complete the email field'
                });
            }
        }
    }

    submit = () => {
        this.setState({
            message: 'Successfully updated profile',
            loading: false
        });
    }

    showUsernameField = (event) => {
        event.preventDefault();
        this.setState({
            usernameDisplay: !this.state.usernameDisplay
        });
    }

    showEmailField = (event) => {
        event.preventDefault();
        this.setState({
            emailDisplay: !this.state.emailDisplay
        });
    }

    render = () =>{
        const { isAuthenticated } = this.props.auth;
        let userInfo;
        let usernameField;
        let emailField;
        let submitButton;
        if (isAuthenticated) {
            userInfo = this.props.auth.user.userInfo;
        }
        if (this.state.usernameDisplay) {
            usernameField =
            <FormControl className="input" type="text" placeholder="New Username" value={this.state.username} onChange={this.handleChange} />;
        }
        if (this.state.emailDisplay) {
            emailField =
            <FormControl className="input" type="email" placeholder="New Email" value={this.state.email} onChange={this.handleChange} />;
        }
        if (this.state.usernameDisplay || this.state.emailDisplay) {
            submitButton =
            <CSSTransition
                in={this.state.appearProfile}
                appear={true}
                timeout={300}
                classNames="fade"
                >
                <FormGroup className="submit">
                    <Button type="submit" name="submit" disabled={!this.validateForm} onClick={this.showFlashMessage}>Submit</Button>
                </FormGroup>
            </CSSTransition>;
        }
        return (
            <CSSTransition
                in={this.state.appearProfile}
                appear={true}
                timeout={300}
                classNames="fade"
                >
                <form className="profile" onSubmit={this.handleSubmit}>
                <p className="profileDescription">Update your profile</p>
                    <FormGroup className="text" controlId="username">
                        <p className="left-side">Current Username:
                            <span className="right-side">{userInfo.username}</span>
                            <img alt="Pencil Edit Img" className="pencil" src={pencil} onClick={this.showUsernameField} />
                        </p>
                        {usernameField}
                    </FormGroup>
                    <FormGroup className="email" controlId="email">
                        <p className="left-side">Current Email:
                            <span className="right-side">{userInfo.email}</span>
                            <img alt="Pencil Edit Img" className="pencil" src={pencil} onClick={this.showEmailField} />
                        </p>
                        {emailField}
                    </FormGroup>
                    <br />
                    <SyncLoader
                        sizeUnit={'px'}
                        size={10}
                        color={'rgba(113, 137, 255, 0.9)'}
                        loading={this.state.loading}
                    />
                    <div id="externalMessage" className={this.state.showClass}>
                        {this.state.message}
                    </div>
                    <br />
                    {submitButton}
                </form>
            </CSSTransition>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Profile);
