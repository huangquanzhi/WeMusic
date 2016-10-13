import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import IconButton from 'material-ui/IconButton';
import ImagePortrait from 'material-ui/svg-icons/image/portrait';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const propTypes = {
    file: PropTypes.object,
    cover: PropTypes.object,
    coverUpload: PropTypes.func,
};


class EditFile extends Component {
    constructor(props) {
        super(props);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.renderDropZoneImage = this.renderDropZoneImage.bind(this);
        this.renderImageDropZone = this.renderImageDropZone.bind(this);
    }

    handleOnDrop(file) {
        const {coverUpload} = this.props;
        // only use one image
        coverUpload(file[0]);
    }

    renderDropZoneImage() {
        const {cover} = this.props;
        // render image instead of text when uploaded
        if (cover !== undefined) {
            return (
                <img
                    src={cover.preview}
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
        const {file} = this.props;
        return (
            <li className="edit-file__item list-group-item">
                <div className="row">
                    <div className="col-md-3">
                        {this.renderImageDropZone()}
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-xs-4">
                                Name: {file.name}
                            </div>
                            <div className="col-xs-8">
                                <IconButton touch={true}>
                                    <ActionDelete />
                                </IconButton>
                            </div>
                        </div>
                        <div className="row">
                            <TextField
                                hintText="Music Name"
                            />
                        </div>
                        <div className="row">
                            <TextField
                                hintText="Author"
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