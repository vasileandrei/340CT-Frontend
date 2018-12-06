import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { logout } from './../../actions/authActions';
import { setCurrentUser } from './../../actions/authActions';
import { store } from './../../index';
import PropTypes from 'prop-types';
import setAuthorizationToken from './../../utils/setAuthorizationToken';
import generateToken from './../../utils/generateToken';
import DropZoneReact from 'react-dropzone';
import uploadReq from './../../actions/axiosFileReq';
import fileIcon from './images/file.png';
import './DropZone.css';

class DropZone extends Component {

	constructor(props){
		super(props);

		this.state = {
			message: '',
			buttonEnable: false,
			show: true,
			showClass: '',
			currentFile: '',
            loading: false,
            appearLogin: true
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

    onDrop = (file) => {
        this.showFlashMessage();
        this.setState({
            buttonEnable: true,
            currentFile: file,
            message: 'File loaded. You can submit now'
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.showFlashMessage();
        if (!this.state.buttonEnable) {
            this.setState({
                message: 'Drop file before submit'
            });
        } else {
            this.setState({
                loading: true,
                message: 'Preparing file to be shared'
            });
            this.upload();
        }
    }

    async appendToRedux(fileInfo) {
        // Remember user
        const index = this.props.auth.user.userInfo.files.length;
        this.props.auth.user.userInfo.files[index] = fileInfo;
        const userInfo = this.props.auth.user;

        // Logout
        this.props.logout();

        // Generate and restore Redux store, local storage and session storage
        const newToken = await generateToken(userInfo);
        localStorage.setItem('jwtToken', newToken);
        setAuthorizationToken(userInfo);
        store.dispatch(setCurrentUser(userInfo));
    }

    async upload() {
        const messageIndex = 0;
        const redirectIndex = 1;
        const fileIndex = 2;

        const username = this.props.auth.user.userInfo.username;
        const email = this.props.auth.user.userInfo.email;
        const file = this.state.currentFile[messageIndex];
        const token = localStorage.getItem('jwtToken');

        const response = await uploadReq('upload', token, file, username, email);
        if (response) {
            this.showFlashMessage();
            const currentFile = response[fileIndex];
            this.setState({
                message: response[messageIndex]
            });
            this.appendToRedux(currentFile);
            if (response[redirectIndex]){
                window.location.replace(`/getFile/${currentFile._id}`);
            }
        } else {
            this.setState({
                message: 'Internal server problems'
            });
        }
        this.setState({
            loading: false
        });
    }

    render = () => {
        return (
            <CSSTransition
                    in={this.state.appearLogin}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    >
                <div className="body">
                    <h1 className="dropZoneTitle">Drag, Drop and Enjoy</h1>
                    <DropZoneReact
                        id="uploadFile"
                        className="drop-zone"
                        name="image"
                        onDrop={this.onDrop}
                    >
                        <div>
                            <img alt="drop zone file icon" src={fileIcon}></img>
                            <br />
                            <h3>Drop file</h3>
                        </div>
                    </DropZoneReact>
                    <div className="display">
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
                        <button className="button" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

DropZone.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(DropZone);
