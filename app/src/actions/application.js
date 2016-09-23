import {
    APPLICATION_SHOW_SETTINGS
} from '../constants/application';

export const isSettingShowing = (status) => ({
    type: APPLICATION_SHOW_SETTINGS,
    status
});