import {
    USER_LOGGED_IN,
    USER_SET_IDTOKEN,
    USER_SET_PROFILE
} from '../constants/user';


/* play mode:
 loop, repeat, shuffle,
 */
const initialState = {
    loggedIn: false,
    idToken: null,
    profile: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: action.status,
            });
        case USER_SET_PROFILE:
            return Object.assign({}, state, {
                profile: action.profile
            });
        case USER_SET_IDTOKEN:
            return Object.assign({}, state, {
                idToken: action.token
            });
        default:
            return state;
    }
};

export default user;