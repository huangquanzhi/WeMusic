import {
    USER_SET_IDTOKEN,
    USER_LOGGED_IN,
    USER_SET_PROFILE
} from '../constants/user';

export const isLoggedIn = (status) => {
    return {type: USER_LOGGED_IN, status};
};

export const setProfile = (profile) => {
    return {type: USER_SET_PROFILE, profile};
};

export const setIdToken = (token) => {
    return {type: USER_SET_IDTOKEN, token};
};