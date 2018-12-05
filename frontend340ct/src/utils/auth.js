// Initiate Auth

import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from './../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

/**
 * Initialize Redux Auth
 *
 * @export
 * @param {object} action
 * @param {object} action
 * @returns {bool} isAuthenticated
 * @returns {object} user
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
};