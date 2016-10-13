import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS,
    FILE_ADD_COVER
} from '../constants/uploads';


const initialState = {
    files: [],
    covers: [],
    uploading: false,
};

const uploads = (state = initialState, action) => {
    switch (action.type) {
        case FILE_UPLOADING:
            return Object.assign({}, state, {
                uploading: action.status,
            });
        case FILE_SET_FILES:
            return Object.assign({}, state, {
                files: [...state.files, ...action.files]
            });
        case FILE_SET_COVERS:
            return Object.assign({}, state, {
                covers: [...state.covers, ...action.covers]
            });
        case FILE_ADD_COVER:
            return Object.assign({}, state, {
                covers: [
                    ...state.covers.slice(0, action.index),
                    action.cover,
                    ...state.covers.slice(action.index + 1)
                ]
            });
        default:
            return state;
    }
};

export default uploads;