import {
    APPLICATION_SHOW_SETTINGS,
    APPLICATION_SHOW_COLOR_PICKER
} from '../constants/application';

const initialState = {
    settings: {
        isOpen: false,
        theme: {
            playerColor: '',
            toolbarColor: '',
        }
    },
    isPickerShow: false,
};

const application = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_SHOW_SETTINGS:
            return Object.assign({}, state, {
                settings: Object.assign({}, state.settings, {
                    isOpen: action.status
                })
            });
        case APPLICATION_SHOW_COLOR_PICKER:
            return Object.assign({}, state, {
                isPickerShow: action.status
            });
        default:
            return state;
    }
};

export default application;