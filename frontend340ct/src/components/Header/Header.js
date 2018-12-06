import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import { logout } from './../../actions/authActions';
import PropTypes from 'prop-types';
import arrow from './images/rightArrow.png';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuToggle: false,
            profileDiv: false,
            profileDisplay: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.displayProfile = this.displayProfile.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    toggleMenu = (event) => {
        // prevent the form to be submitted to its action url
        event.preventDefault();
        if (this.state.menuToggle === false) {
            this.setState({
                menuToggle: true
            });
        } else if (this.state.menuToggle === true) {
            this.setState({
                menuToggle: false
            });
        }
    }

    async logout(event) {
        event.preventDefault();
        await this.props.logout();
        window.location.replace('/');
        this.props.toast('Successfully logged out!');
    }

    renderProfile = (event) => {
        event.preventDefault();
        window.location.replace('/myProfile');
    }

    displayProfile = () => {
        this.setState({
            profileDiv: !this.state.profileDiv
        });
    }

    setDisplayProfileFalse = (event) => {
        event.preventDefault();
        this.setState({
            profileDiv: false
        });
    }

    login = (event) => {
        event.preventDefault();
        window.location.replace('/loginAndRegister');
    }

    shareFile = (event) => {
        event.preventDefault();
        window.location.replace('/shareFile');
    }

    myFiles = (event) => {
        event.preventDefault();
        window.location.replace('/files');
    }

    render = () => {
        const { isAuthenticated } = this.props.auth;
        let userLinks;
        let menuItems;
        const guestLinks =
        <Button className="actionButton" onClick={this.login}>Login</Button>;

        if (isAuthenticated) {
            const userInfo = this.props.auth.user.userInfo;
            userLinks =
            <div>
                <div className="infoDropDown" onMouseEnter={this.displayProfile}>
                    {userInfo.email}
                </div>
                <div className={this.state.profileDiv ? 'dropDown' : 'hidden'} onMouseLeave={this.displayProfile}>
                    <div className="profileDropDown">
                        <div className="dropDownItem" onClick={this.shareFile}>Share File</div>
                        <div className="separator"></div>
                        <div className="dropDownItem" onClick={this.myFiles}>My Files</div>
                        <div className="separator"></div>
                        <div className="dropDownItem" onClick={this.renderProfile}>Profile</div>
                        <div className="separator"></div>
                        <div className="dropDownItem" onClick={this.logout}>Logout</div>
                        <div className="lastItem"></div>
                    </div>
                </div>
            </div>;
            menuItems =
            <a className="menu-item" href="/shareFile">Share File
                <img src={arrow} className="menu-arrow" alt="sideMenu arrow"></img>
            </a>;
        }

        return (
            <div className="body">
            <ToastContainer
                autoClose={2500}
                pauseOnHover={false}
                hideProgressBar={true}
                className='toast'
            />
                <div className="header" onMouseLeave={this.setDisplayProfileFalse}>
                    <div className={this.state.menuToggle ? 'cross' : 'parallel'} onClick={this.toggleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <h1><a href="/">FileSharing</a></h1>
                    { isAuthenticated? userLinks : guestLinks }
                </div>
                <Menu
                    disableOverlayClick={() => this.setState({ menuToggle: false })}
                    isOpen={this.state.menuToggle}
                    width={ '200px' }
                    crossClassName={ 'crossClassName' }
                 >
                    <a className="menu-item" href="/">Home
                        <img src={arrow} className="menu-arrow" alt="sideMenu arrow"></img>
                    </a>
                    <a className="menu-item" href="/loginAndRegister">Login or Register
                        <img src={arrow} className="menu-arrow" alt="sideMenu arrow"></img>
                    </a>
                    { menuItems }
                </Menu>
            </div>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(Header);