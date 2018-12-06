import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginAndRegister from './apps/LoginAndRegister/LoginAndRegister';
import MainPage from './apps/MainPage/MainPage';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import FileShare from './components/FileShare/FileShare';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';

class App extends Component {

    /**
     * Universal toast message displayer
     *
     * @param {String} message
     * @memberof App
     */
    notify(message) {
        toast(message, { className: 'toast' });
    }

    render() {
        return (
            // Initialize Routing Model
            <BrowserRouter>
            <div>
                <Header toast={this.notify} />
                <Route exact path="/" component={Home} />
                <Route path="/loginAndRegister" component={LoginAndRegister} />
                <Route path="/shareFile" component={MainPage} />
                <Route path="/getFile/:id" component={FileShare} />
                <Route path="/contact" component={Contact} />
                <Route path="/myProfile" component={Profile} />
                <Footer />
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
