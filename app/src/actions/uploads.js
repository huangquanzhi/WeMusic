import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS,
    FILE_ADD_COVER,
    FILE_EDIT_MUSIC_NAME,
    FILE_EDIT_MUSIC_AUTHOR,
    FILE_UPLOAD_PROGRESS,
    FILE_CLEAR_FILES,
    FILE_REMOVE_FILE,
} from '../constants/uploads';

import {
    UPLOAD_END_POINT
} from '../constants/application';

export const isFileUploading = (status) => {
    return {type: FILE_UPLOADING, status};
};

export const setUploadProgress = (value) => {
    return {type: FILE_UPLOAD_PROGRESS, value};
};

export const runUploadQueue = () => {
    return (dispatch, getState) => {

        const {uploads, user} = getState();
        const files = uploads.files;

        if (files.length > 0) {
            let formData = new FormData();
            let progress = 0;
            let setProgress;
            // put all files in queue
            files.map((file, index) => {
                formData.append('uploads[]', file.data, file.data.name);
                formData.append('covers[]', file.cover);
                formData.append('names[]', file.name);
                formData.append('authors[]', file.author);
            });

            // start the upload
            dispatch(isFileUploading(true));

            $.ajax({
                url: UPLOAD_END_POINT,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    "Authorization": "bearer " + user.idToken
                },
                beforeSend: (xhr) => {
                    progress = 0;
                },
                success: (data) => {
                },
                complete: () => {
                    // clear interval when its completed
                    clearInterval(setProgress);
                    // set upload status
                    dispatch(isFileUploading(false));
                    // fill up the progress bar
                    dispatch(setUploadProgress(100));
                },
                xhr: () => {
                    // create an XMLHttpRequest
                    let xhr = new XMLHttpRequest();
                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function (evt) {

                        if (evt.lengthComputable) {
                            let percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            // update progress bar
                            progress = percentComplete;

                        }
                    }, false);

                    return xhr;
                }
            });


            // update progress bar every 1 second
            setProgress = setInterval(() => {
                dispatch(setUploadProgress(progress));
            }, 1000);

        }
    }
};

export const setUploadFiles = (files) => {
    // split files and create object

    let fileArray = [];

    // create new object in array if files being pass is not null
    if (Array.isArray(files) && files != undefined) {
        files.map((file) => {
            fileArray.push({
                data: file,
                cover: null,
                name: '',
                author: ''
            })
        });
    }

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

export const clearUploads = () => {
    return {type: FILE_CLEAR_FILES};
};

export const removeFile = (index) => {
    return {type: FILE_REMOVE_FILE, index};
};