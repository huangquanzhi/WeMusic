import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS
} from '../constants/uploads';

export const isFileUploading = (status) => {
    return {type: FILE_UPLOADING, status};
};

export const setUploadFiles = (files) => {
    return {type: FILE_SET_FILES, files};
};

export const setUploadCovers = (covers) => {
    return {type: FILE_SET_COVERS, covers};
};

export const addUploadCover = (index, cover) => {
    return {type: FILE_SET_COVERS, index, cover};
};