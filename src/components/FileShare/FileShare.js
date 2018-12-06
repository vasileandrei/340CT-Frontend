
import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { logout } from './../../actions/authActions';
import { store } from './../../index';
import { setCurrentUser } from './../../actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CSSTransition } from 'react-transition-group';
import { Confirm } from 'react-confirm-bootstrap';
import PropTypes from 'prop-types';
import customerEmail from './../../actions/emailReq';
import deleteFile from './../../actions/axiosFileDel';
import downloadReq from './../../actions/axiosFileReq';
import deleteReq from './../../utils/markAsDeleted';
import setAuthorizationToken from './../../utils/setAuthorizationToken';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './FileShare.css';

const domainName = 'localhost:3000';
let currentFile;

class FileShare extends Component {

    constructor(props) {
        super(props);

        let textBoxInput;
        let expireDate;

        currentFile = this.props.auth.user.userInfo.files.find(o => o._id === props.match.params.id);

        if (currentFile){
            const expired = this.checkExpire(currentFile.expires);
            if (expired) {
                textBoxInput = 'File expired';
            } else {
                textBoxInput = `${domainName}${this.props.location.pathname}`;
                expireDate = this.displayText(currentFile.expires);
            }
        }

        this.state = {
            boxText: textBoxInput,
            copied: false,
            appearLogin: true,
            loading: false,
            message: '',
            targetDate: expireDate,
            alertBox: false
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

    notify = () => {
        if (this.state.boxText) {
            toast('Successfully copied to clipboard', { className: 'toast' });
        } else {
            toast('There is no text to add to clipboard', { className: 'toast' });
        }
    }

    restore = (user, token) => {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(user);
        store.dispatch(setCurrentUser(user));
    }

    checkExpire = (file) => {
        if (typeof file !== 'undefined'){
            const time = file.expires;
            const currentTime = Date.now();
            if (currentTime > time) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    displayText = (expires) => {
        const date = new Date(expires);
        return date.toUTCString();
    }

    handleDownload = () => {
        this.showFlashMessage();
        this.setState({
            message: 'Initiate download',
            loading: true
        });
        this.download();
        // console.log(currentFile._id);
    }


    async download() {
        const userIndex = 0;
        const tokenIndex = 1;

        const expired = this.checkExpire(currentFile);
        if (expired) {
            this.setState({
                message: 'File expired. It can no longer be downloaded.',
                loading: false,
                boxText: 'File expired'
            });

        } else {
            // Soft delete file
            const delBool = await deleteFile('soft_delete', currentFile._id);
            if (delBool) {
                const token = localStorage.getItem('jwtToken');

                const response = await deleteReq(token);
                const newUser = response[userIndex];
                const newToken = response[tokenIndex];

                // Clear current redux store
                this.props.logout();
                // Initiate download
                let message = await downloadReq('download', token, currentFile.url);
                if (!message) {
                    message = 'Failed to download';
                }
                this.setState({
                    loading: false,
                    message
                });
                // Set Redux store back
                this.restore(newUser, newToken);
                window.location.replace('/');

                // Send email to author
                await customerEmail('customer', token, currentFile.email, currentFile._id);
            }

        }
        this.showFlashMessage();
    }

    onConfirm = () => {
        this.handleDownload();
    }

    render = () => {
        const expireText = <p>File expires on <b>{this.state.targetDate}</b></p>;
        return (
            <CSSTransition
            in={this.state.appearLogin}
            appear={true}
            timeout={300}
            classNames="fade"
            >
                <div className='body'>
                <ToastContainer
                    autoClose={2500}
                    pauseOnHover={false}
                    hideProgressBar={true}
                    className='toast'
                />
                    <div className='content'>
                        <h1 className='homeTitle'>Your file is ready</h1>
                        <br /> <br />
                        { this.state.targetDate? expireText : ''}
                        <br />
                        <p className='linkDisplay'>
                            <a className='textOnBox' target="_blank" rel="noopener noreferrer"
                            href={this.state.boxText}>
                                {this.state.boxText}
                            </a>
                            </p>
                        <br />
                        <div className='display'>
                            <SyncLoader
                                sizeUnit={'px'}
                                size={10}
                                color={'rgba(113, 137, 255, 0.9)'}
                                loading={this.state.loading}
                            />
                            <br />
                            <div className={this.state.showClass}>
                                {this.state.message}
                            </div>
                        </div>
                        <br />
                        <CopyToClipboard text={this.state.boxText}>
                            <button id='copyButton' className='actionButton' onClick={this.notify}>Copy</button>
                        </CopyToClipboard>
                        <Confirm
                            test={this.visible}
                            className="confirmBox"
                            onConfirm={this.onConfirm}
                            body="Downloading the file will delete the file from the website. Do you wish to continue?"
                            confirmText="Download"
                            title="Download File">
                            <button id='downloadButton' className='actionButton' onClick={this.handleDownload}>Download</button>
                        </Confirm>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

FileShare.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired

};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(FileShare);
