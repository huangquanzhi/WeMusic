import {
    APPLICATION_SHOW_SETTINGS,
    APPLICATION_SHOW_COLOR_PICKER,
    APPLICATION_SET_TOOLBAR_COLOR,
    APPLICATION_SET_PLAYER_COLOR
} from '../constants/application';

const initialState = {
    settings: {
        isOpen: false,
        theme: {
            playerColor: '#F44336',
            toolbarColor: '#F44336',
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
        case APPLICATION_SET_TOOLBAR_COLOR:
            return Object.assign({}, state, {
                settings: Object.assign({}, state.settings, {
                    theme: Object.assign({}, state.settings.theme, {
                        toolbarColor: action.color
                    })
                })
            });
        case APPLICATION_SET_PLAYER_COLOR:
            return Object.assign({}, state, {
                settings: Object.assign({}, state.settings, {
                    theme: Object.assign({}, state.settings.theme, {
                        playerColor: action.color
                    })
                })
            });
        default:
            return state;
    }
};

export default application;