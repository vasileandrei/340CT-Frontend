// Axios Request to update token

import axios from 'axios';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Update or alter existing token
 *
 * @export
 * @param {String} token
 * @returns [{Object} user, {String} newToken]
 */
export default function(token) {
    return new Promise((resolve, reject) => {
        let newToken;
        let user;
        const api_uri = 'http://localhost:8080/GatewayApi/users/tokenUpdate';
        axios.post(api_uri, {
            token,
            headers,
            json: true
        })
        .then(res => {
            // const respJS = JSON.parse(res.data.content.text);
            if (res.data.hasBeenSuccessful === true){
                newToken = res.data.content.token; // Newly generated token
                user = res.data.content.user; // Newly generated Redux Storage User
            }
            resolve([user, newToken]);
        })
        .catch(error => reject(error.message));
    });
}