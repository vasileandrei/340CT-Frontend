// Generate a new Token Axios Request

import axios from 'axios';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Request to generate a new user token
 *
 * @export
 * @param {object} user
 * @returns {string} newToken
 */
export default function(user) {
    return new Promise((resolve, reject) => {
        let newToken;
        const api_uri = 'http://localhost:8080/GatewayApi/users/signToken';
        axios.post(api_uri, {
            user,
            headers
        })
        .then(res => {
            if (res.data.hasBeenSuccessful === true) {
                newToken = res.data.content.token;
            }
            resolve(newToken); // newly generated token
        })
        .catch(error => reject(error.message));
    });
}