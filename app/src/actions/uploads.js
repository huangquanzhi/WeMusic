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

export const runUploadQueue = (files) => {

    if (files.length > 0) {
        var formData = new FormData();

        // put all files in queue
        files.map((file, index) => {
            formData.append('uploads[]', file.data, file.data.name);
        })

        $.ajax({
            url: '/',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                console.log('upload successful!');
            },
            xhr: () => {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();
                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function (evt) {

                    if (evt.lengthComputable) {
                        let percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete + "%");
                    }
                }, false);

                return xhr;
            }
        });
    }
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