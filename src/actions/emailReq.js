
import axios from 'axios';
import { CUSTOMER_EMAIL, FEEDBACK_EMAIL } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

export default function deleteFile(action, token, email, id, fullName, message) {
    headers.headers['Authorization'] = token;
    if (action === CUSTOMER_EMAIL) {
        return new Promise((reject) => {
            const api_uri = 'http://localhost:8080/GatewayApi/email/customer/';
            axios.post(api_uri, {
                email,
                id,
                headers,
                json: true
            })
            .catch(error => reject(error.message));
        });
    } else if (action === FEEDBACK_EMAIL) {
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/GatewayApi/email/feedback/';
            axios.post(api_uri, {
                fullName,
                email,
                message,
                headers,
                json: true
            })
            .then(res => {
                if (typeof res !== 'undefined') resolve(true);
            })
            .catch(error => reject(error.message));
        });
    }
}