// Authentification Fucntions

import setAuthorizationToken from './../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * Setting current user in Redux
 *
 * @export
 * @param {Object} user
 * @returns {string} type
 * @returns {Object} user
 *
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * Removes user credentials from localstorage
 * and from Redux storage
 *
 * @export
 * @returns
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
