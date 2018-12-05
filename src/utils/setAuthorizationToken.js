// Set authorization header

import axios from 'axios';

/**
 * Attach or remove Authorization Token
 *
 * @export
 * @param {String} token
 */
export default function setAuthorizationHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}