import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import IconButton from 'material-ui/IconButton';
import ImagePortrait from 'material-ui/svg-icons/image/portrait';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const propTypes = {
    file: PropTypes.object,
    coverUpload: PropTypes.func,
    nameEdit: PropTypes.func,
    authorEdit: PropTypes.func,
    fileRemove: PropTypes.func,
};


class EditFile extends Component {
    constructor(props) {
        super(props);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditAuthor = this.handleEditAuthor.bind(this);
        this.renderDropZoneImage = this.renderDropZoneImage.bind(this);
        this.renderImageDropZone = this.renderImageDropZone.bind(this);
    }

    handleOnDrop(file) {
        const {coverUpload} = this.props;
        // only use one image
        coverUpload(file[0]);
    }

    handleEditName(e) {
        const {nameEdit} = this.props;
        nameEdit(e.target.value);
    }

    handleEditAuthor(e) {
        const {authorEdit} = this.props;
        authorEdit(e.target.value);
    }

    renderDropZoneImage() {
        const {file} = this.props;
        // render image instead of text when uploaded
        if (file.cover !== null) {
            return (
                <img
                    src={file.cover.preview}
                    width="120"
                />
            )
        }
        return (
            <ImagePortrait
                style={{
                    width: 64,
                    height: 64,
                    padding: 12,
                }}
            />
        )
    }

    renderImageDropZone() {
        return (
            <Dropzone className="file__drop" onDrop={this.handleOnDrop}
                      accept="image/*">
                <div className="file__drop-zone file__drop-zone_small">
                    {this.renderDropZoneImage()}
                </div>
            </Dropzone>
        )
    }

    render() {
        const {file, fileRemove} = this.props;
        return (
            <li className="edit-file__item list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        {this.renderImageDropZone()}
                    </div>
                    <div className="col-md-6 col-md-offset-1">
                        <div className="row">
                            <div className="col-xs-4">
                                Name: {file.data.name}
                            </div>
                            <div className="col-xs-8">
                                <IconButton touch={true} onClick={fileRemove}>
                                    <ActionDelete/>
                                </IconButton>
                            </div>
                        </div>
                        <div className="row">
                            <TextField
                                floatingLabelText="Music Name"
                                floatingLabelFixed={true}
                                value={file.name}
                                errorText={file.name == "" ? "Required" : ""}
                                onChange={this.handleEditName}
                            />
                        </div>
                        <div className="row">
                            <TextField
                                floatingLabelText="Author"
                                floatingLabelFixed={true}
                                value={file.author}
                                errorText={file.author == "" ? "Required" : ""}
                                onChange={this.handleEditAuthor}
                            />
                        </div>
                    </div>
                </div>
            </li>
        );

    }
}

EditFile.propTypes = propTypes;

export default EditFile;