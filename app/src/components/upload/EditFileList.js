import React, {Component, PropTypes} from 'react';

import EditFile from './EditFile';

const propTypes = {
    uploads: PropTypes.object,
    uploadActions: PropTypes.object,
};


class EditFileList extends Component {
    constructor(props) {
        super(props);
        this.handleCoverUpload = this.handleCoverUpload.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
    }

    handleCoverUpload(index, image) {
        const {uploadActions} = this.props;
        console.log("Index " + index);
        console.log(image);
        uploadActions.addUploadCover(index, image);
    }

    renderItemList() {
        const {uploads} = this.props;
        return uploads.files.map((file, index) => {
            return (
                <EditFile
                    key={"edit-file-item-" + index}
                    file={file}
                    cover={uploads.covers[index]}
                    coverUpload={(image) => {
                        this.handleCoverUpload(index, image);
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