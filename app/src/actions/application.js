import {
    APPLICATION_SHOW_SETTINGS,
    APPLICATION_SHOW_COLOR_PICKER,
    APPLICATION_SET_PLAYER_COLOR,
    APPLICATION_SET_TOOLBAR_COLOR
} from '../constants/application';

export const isSettingShowing = (status) => ({
    type: APPLICATION_SHOW_SETTINGS,
    status
});

export const isColorPickerShow = (status) => ({
    type: APPLICATION_SHOW_COLOR_PICKER,
    status
});

export const setToolbarColor = (color) => ({
    type: APPLICATION_SET_TOOLBAR_COLOR,
    color
});

export const setPlayerColor = (color) => ({
    type: APPLICATION_SET_PLAYER_COLOR,
    color
});
