import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dropzone from 'react-dropzone';

import EditFileList from './EditFileList';

const propTypes = {
    onRequest: PropTypes.func,
    onDrop: PropTypes.func,
    onFinish: PropTypes.func,
    isOpen: PropTypes.bool,
    uploads: PropTypes.object,
    uploadActions: PropTypes.object,
};

class UploadDialog extends Component {
    constructor(props) {
        super(props);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handlePrevStep = this.handlePrevStep.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.renderDropZone = this.renderDropZone.bind(this);
        this.renderMusicInformation = this.renderMusicInformation.bind(this);
        this.renderStepActions = this.renderStepActions.bind(this);
        this.renderStepper = this.renderStepper.bind(this);
        this.renderUploadProgess = this.renderUploadProgess.bind(this);
        this.renderUploadQueue = this.renderUploadQueue.bind(this);
        this.renderUploadInformation = this.renderUploadInformation.bind(this);
        this.state = {
            stepIndex: 0,
            totalMB: 0,
        }
    }

    handleNextStep() {
        const {stepIndex} = this.state;
        const {uploads, onFinish} = this.props;

        // step index
        switch (stepIndex) {
            case 0:
                // more than 1 file,  ready to go to next
                if (uploads.files.length > 0) {
                    this.setState({
                        stepIndex: stepIndex + 1
                    });
                }
                break;
            case 1:
                // edit music information step

                // true if something is required to fill
                const isRequired = _.some(uploads.files, (o) => {
                    return o.name == "" || o.author == "";
                });

                if (!isRequired) {

                    // calculate total size
                    let totalSize = 0;

                    // adding all file size
                    uploads.files.map((file) => {
                        totalSize += file.data.size;
                        if (file.cover != null) {
                            totalSize += file.cover.size;
                        }
                    });

                    // rounding
                    totalSize = Math.round(((totalSize / 1024) / 1024) * 100) / 100;

                    // store total size in state
                    this.setState({
                        totalMB: totalSize,
                        stepIndex: stepIndex + 1
                    });
                }
                break;
            case 2:
                // final step

                // if file is NOT uploading
                if (!uploads.status.uploading) {
                    this.setState({
                        stepIndex: 0
                    });
                    // on finish clicked
                    onFinish();
                }
                break;
        }

    }

    handlePrevStep() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    handleOnDrop(acceptFile) {
        const {onDrop} = this.props;
        onDrop(acceptFile);
    }

    renderDropZone() {
        const {uploads} = this.props;
        return (
            <Dropzone className="file__drop" onDrop={this.handleOnDrop}
                      accept="audio/ogg,audio/mp3,audio/acc,audio/wav">
                <div className="file__drop-zone file__drop-zone_large">
                    <div className="row">
                        <FileUpload
                            style={{
                                width: 120,
                                height: 120,
                                padding: 30,
                            }}
                        />
                    </div>
                    <div className="row">
                        <h3><b>Upload</b> or <b>Drag</b></h3>
                    </div>
                    <div className="row">
                        {uploads.files.length} file(s) added
                    </div>
                </div>
            </Dropzone>
        )
    }

    renderMusicInformation() {
        const {uploads, uploadActions} = this.props;
        return (
            <EditFileList uploads={uploads} uploadActions={uploadActions}/>
        )
    }

    renderUploadInformation() {
        const {uploads} = this.props;

        return (
            <div className="upload__informations">
                <div className="col-md-6">
                    <b>Total Files</b> : {uploads.files.length}
                </div>
                <div className="col-md-6">
                    <b>Total Size</b> : {this.state.totalMB} MB
                </div>
            </div>
        )
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;
        const {uploads}= this.props;

        return (
            <div style={{margin: '12px 0'}}>
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrevStep}
                    />
                )}
                <RaisedButton
                    label={stepIndex === 2 ? 'Upload' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    disabled={(uploads.files.length < 1) || uploads.status.uploading}
                    primary={true}
                    onTouchTap={this.handleNextStep}
                    style={{marginRight: 12}}
                />
            </div>
        );
    }

    renderStepper() {
        return (
            <Stepper activeStep={this.state.stepIndex} orientation="vertical">
                <Step>
                    <StepLabel>Choose a music</StepLabel>
                    <StepContent>
                        { this.renderDropZone()}
                        { this.renderStepActions(0)}
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Music Information</StepLabel>
                    <StepContent>
                        { this.renderMusicInformation()}
                        { this.renderStepActions(1)}
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Final</StepLabel>
                    <StepContent>
                        { this.renderUploadInformation()}
                        { this.renderStepActions(2)}
                    </StepContent>
                </Step>
            </Stepper>
        )
    }

    renderUploadProgess() {
        const {progress} = this.props.uploads.status;

        return (
            <div className="progress">
                <div
                    className="progress-bar progress-bar-striped active"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={ {width: progress + "%"}}
                >
                    {progress} %
                </div>
            </div>
        )
    }

    renderUploadQueue() {
        const {onRequest, uploads} = this.props;
        const {totalMB} = this.state;

        const currentMB = Math.round((totalMB * (uploads.status.progress / 100)) * 100) / 100;

        return (
            <div className="file__upload_queue">
                <div className="row">
                    <div className="col-md-6 col-md-offset-4">
                        <h3>Upload Status</h3>
                    </div>
                </div>
                <div className="row">
                    {this.renderUploadProgess()}
                </div>
                <div className="row">
                    <div className="col-md-5 col-md-offset-7">
                        <p>Current: {currentMB} MB - Total: {totalMB} MB</p>
                    </div>
                </div>
                <div className="row">
                    <RaisedButton
                        label="Close"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        fullWidth={true}
                        primary={true}
                        onTouchTap={onRequest}
                        style={{marginRight: 12}}
                    />
                </div>
            </div>
        )
    }

    render() {
        const {onRequest, isOpen} = this.props;
        return (
            <Dialog
                title="Upload"
                modal={false}
                open={isOpen}
                contentStyle={{
                    width: '100%',
                    maxWidth: 'none',
                }}
                onRequestClose={onRequest}
                autoScrollBodyContent={true}
            >
                <div className="col-md-6">
                    { this.renderStepper()}
                </div>
                <div className="col-md-6">
                    { this.renderUploadQueue() }
                </div>
            </Dialog>
        )
    }
}

UploadDialog.propTypes = propTypes;

export default UploadDialog;