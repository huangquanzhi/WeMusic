import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS,
    FILE_ADD_COVER,
    FILE_ADD_MUSIC_INFO
} from '../constants/uploads';

export const isFileUploading = (status) => {
    return {type: FILE_UPLOADING, status};
};

export const setUploadFiles = (files) => {
    // split files and create object

    let fileArray = [];

    // create new object
    files.map((file, index) => {
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