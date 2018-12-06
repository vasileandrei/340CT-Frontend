// Axios Request Email - Customer or Feedback

import axios from 'axios';
import { CUSTOMER_EMAIL, FEEDBACK_EMAIL } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * IF CUSTOMER_EMAIL - Send email to customer
 * IF FEEDBACK_EMAIL - Send email from customer (feedback to server)
 *
 * @export
 * @param {string} action
 * @param {string} token
 * @param {string} email
 * @param {string} id
 * @param {string} fullName
 * @param {string} message
 * @returns bool
 */
export default function deleteFile(action, token, email, id, fullName, message) {
    // Set Authorization Token
    headers.headers['Authorization'] = token;
    // Send Customer Email
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
    // Send Feedback Email
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
                if (typeof res !== 'undefined') resolve(true); // Send successful bool
            })
            .catch(error => reject(error.message));
        });
    }
}