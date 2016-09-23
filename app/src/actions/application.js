import {
    APPLICATION_SHOW_SETTINGS,
    APPLICATION_SHOW_COLOR_PICKER
} from '../constants/application';

export const isSettingShowing = (status) => ({
    type: APPLICATION_SHOW_SETTINGS,
    status
});

export const isColorPickerShow = (status) => ({
    type: APPLICATION_SHOW_COLOR_PICKER,
    status
});