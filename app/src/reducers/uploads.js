import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS,
    FILE_ADD_COVER,
    FILE_EDIT_MUSIC_NAME,
    FILE_EDIT_MUSIC_AUTHOR,
} from '../constants/uploads';


/*

 files: [
 {
 data: fileData
 cover: imageFile
 name: string
 author: string
 }
 ]
 */


const initialState = {
    files: [],
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
                files: [
                    ...state.files.slice(0, action.index),
                    Object.assign({}, state.files[action.index],
                        {
                            cover: action.cover,
                        }),
                    ...state.files.slice(action.index + 1)
                ]
            });
        case FILE_EDIT_MUSIC_NAME:
            return Object.assign({}, state, {
                files: [
                    ...state.files.slice(0, action.index),
                    Object.assign({}, state.files[action.index],
                        {
                            name: action.name,
                        }),
                    ...state.files.slice(action.index + 1)
                ]
            });
        case FILE_EDIT_MUSIC_AUTHOR:
            return Object.assign({}, state, {
                files: [
                    ...state.files.slice(0, action.index),
                    Object.assign({}, state.files[action.index],
                        {
                            author: action.author,
                        }),
                    ...state.files.slice(action.index + 1)
                ]
            });
        default:
            return state;
    }
};

export default uploads;