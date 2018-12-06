import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { SyncLoader } from 'react-spinners';
import feedbackEmail from './../../actions/emailReq';
import './Contact.css';

const zero = 0;

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            inputMessage: '',
            appearContact: true,
            loading: false,
            message: ''
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
        if (this.state.fullName.length > zero && this.state.email.length > zero &&
            this.state.inputMessage.length > zero) {
            this.setState({
                loading: true
            });
            this.submit();
        } else {
            this.setState({
                message: 'Please complete the entire form'
            });
        }
    }

    async submit() {
        this.setState({
            message: 'Processing the request'
        });
        this.showFlashMessage();

        const fullName = this.state.fullName;
        const email = this.state.email;
        const inputMessage = this.state.inputMessage;

        const success = await feedbackEmail('feedback', '', email, '', fullName, inputMessage);
        if (success) {
            this.setState({
                loading: false,
                message: 'Feedback received'
            });
            window.location.replace('/');
        }
    }

    render = () => {
        return (
            <CSSTransition
                in={this.state.appearContact}
                appear={true}
                timeout={300}
                classNames="fade"
                >
                <form className="contact-form" onSubmit={this.handleSubmit}>
                    <h1 className="contactTitle">Thank you for the feedback</h1>
                    <FormGroup className="field" controlId="fullName">
                        <FormControl autoFocus className="input" type="text"
                        placeholder="Full name" value={this.state.fullName} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="field" controlId="email">
                        <FormControl className="input" type="email"
                        placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="text" controlId="inputMessage">
                        <FormControl className="input textArea" componentClass="textarea"
                        placeholder="Mesage here..." value={this.state.inputMessage} onChange={this.handleChange} />
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
                        <Button type="submit" name="submit" disabled={!this.validateForm}
                        onClick={this.showFlashMessage}>Submit</Button>
                    </FormGroup>
                    <br />
                </form>
            </CSSTransition>
        );
    }
}

export default Contact;