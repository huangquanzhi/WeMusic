import React, {Component, PropTypes} from 'react';

import EditFile from './EditFile';

const propTypes = {
    uploads: PropTypes.object,
    uploadActions: PropTypes.object,
};


class EditFileList extends Component {
    constructor(props) {
        super(props);
        this.renderItemList = this.renderItemList.bind(this);
    }

    renderItemList() {
        const {uploads, uploadActions} = this.props;
        return uploads.files.map((file, index) => {
            return (
                <EditFile
                    key={"edit-file-item-" + index}
                    file={file}
                    coverUpload={(image) => {
                        uploadActions.addUploadCover(index, image);
                    }}
                    nameEdit={(name) => {
                        uploadActions.editUploadName(index, name);
                    }}
                    authorEdit={(author) => {
                        uploadActions.editUploadAuthor(index, author);
                    }}
                />
            )
        })
    }

    render() {
        const {} = this.props;
        return (
            <div className="edit-file__list">
                <ul className="list-group">
                    {this.renderItemList()}
                </ul>
            </div>
        );

    }
}

EditFileList.propTypes = propTypes;

export default EditFileList;