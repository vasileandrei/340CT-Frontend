import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appearHome: true
        };
        this.login = this.login.bind(this);
    }

    login = (event) => {
        event.preventDefault();
        window.location.replace('/loginAndRegister');
    }

    shareFile = (event) => {
        event.preventDefault();
        window.location.replace('/shareFile');
    }

    render = () => {
        const { isAuthenticated } = this.props.auth;
        const userInfo = this.props.auth.user.userInfo;
        let buttonToDisplay;
        if (isAuthenticated) {
            buttonToDisplay =
            <div>
                <p className='welcomeMessage'>Welcome {userInfo.username}!</p>
                <Button className="actionButtons" onClick={this.shareFile}>Share File</Button>
            </div>;
        } else {
            buttonToDisplay =
            <Button className="actionButtons" onClick={this.login}>Signup</Button>;
        }
        return (
            <CSSTransition
                in={this.state.appearHome}
                appear={true}
                timeout={300}
                classNames="fade"
                >
                <div className='body'>
                    <div className='background'>
                        <div className='content'>
                            <h1 className='homeTitle'>Share files fast and secure</h1>
                            <p className='paragraphText-big'>
                                Create a free account, upload your favourite
                                files to the website and share them using only
                                a generated URL.
                            </p>
                            {buttonToDisplay}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Home);
