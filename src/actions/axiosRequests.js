import axios from 'axios';
import setAuthorizationHeader from './../utils/setAuthorizationToken';
import { LOGIN_REQ, REGISTER_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

const notFoundStatus = 404;

export default function(action, username, password, email) {
    if (action === LOGIN_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            const api_uri = 'http://localhost:8080/GatewayApi/users/login';
            axios.post(api_uri, {
                username,
                password,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    message = res.data.content.message;
                    redirect = true;
                    const token = res.data.content.token;
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationHeader(token);
                } else if (res.data.errors.statusCode === notFoundStatus){
                    message = 'Username and password don\'t match';
                }
                resolve([message, redirect]);
            })
            .catch(error => reject(error.message));
        });
    } else if (action === REGISTER_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            const api_uri = 'http://localhost:8080/GatewayApi/users/register';
            axios.post(api_uri, {
                username,
                password,
                email,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    redirect = true;
                    message = res.data.content.message;
                } else {
                    message = res.data.errors.error.message;
                }
                resolve([message, redirect]);
            })
            .catch(error => reject(error.message));
        });
    }
}
