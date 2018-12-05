import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render = () => {
        const { isAuthenticated } = this.props.auth;
        let userLinks;
        let additionalUserLinks;
        if (isAuthenticated) {
            userLinks =
            <div>
                <li><a className='footer-item' href="/shareFile">Share File</a></li>
                <li><a className='footer-item' href="/files">My Files</a></li>
            </div>;
            additionalUserLinks =
                <li><a className='footer-item' href="/contact">Report bug</a></li>;
        }
        return (
            <div className='body'>
                <div className="footer">
                    <div className='left-footer'>
                        <ul>
                            <li><a className='footer-item' href="/">Home</a></li>
                            <li><a className='footer-item' href="/loginAndRegister">Login or Register</a></li>
                            {userLinks}
                        </ul>
                    </div>
                    <div className='right-footer'>
                        <ul>
                            <li><a className='footer-item' href="/contact">Contant us</a></li>
                            {additionalUserLinks}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Footer);
