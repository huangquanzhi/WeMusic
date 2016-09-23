import {
    APPLICATION_SHOW_SETTINGS,
} from '../constants/application';

const initialState = {
    settings: {
        isOpen: false,
        theme: {
            playerColor: '',
            toolbarColor: '',
        }
    },
};

const application = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_SHOW_SETTINGS:
            return Object.assign({}, state, {
                settings: Object.assign({}, state.settings, {
                    isOpen: action.status
                })
            });
        default:
            return state;
    }
};

export default application;