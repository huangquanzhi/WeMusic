import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS,
    FILE_ADD_COVER,
    FILE_EDIT_MUSIC_NAME,
    FILE_EDIT_MUSIC_AUTHOR
} from '../constants/uploads';

export const isFileUploading = (status) => {
    return {type: FILE_UPLOADING, status};
};

export const setUploadFiles = (files) => {
    // split files and create object

    let fileArray = [];

    // create new object
    files.map((file) => {
        fileArray.push({
            data: file,
            cover: null,
            name: '',
            author: ''
        })
    });

    return {type: FILE_SET_FILES, files: fileArray};
};

export const setUploadCovers = (covers) => {
    return {type: FILE_SET_COVERS, covers};
};

export const addUploadCover = (index, cover) => {
    return {type: FILE_ADD_COVER, index, cover};
};

export const editUploadName = (index, name) => {
    return {type: FILE_EDIT_MUSIC_NAME, index, name};
};

export const editUploadAuthor = (index, author) => {
    return {type: FILE_EDIT_MUSIC_AUTHOR, index, author};
};