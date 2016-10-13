import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

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
        this.state = {
            finished: false,
            stepIndex: 0
        }
    }

    handleNextStep() {
        const {stepIndex} = this.state;
        const {uploads, onFinish, onRequest} = this.props;
        // if final step
        if (stepIndex >= 2) {
            this.setState({
                stepIndex: 0,
                finished: false
            });

            // on finish clicked
            onFinish();
            // close dialog
            onRequest(true);
        } else {
            // not final step yet

            // more than 1 file,  ready to go to next
            if (uploads.files.length > 0) {
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: stepIndex >= 2,
                });
            }
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
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    disabled={(uploads.files.length < 1)}
                    primary={true}
                    onTouchTap={this.handleNextStep}
                    style={{marginRight: 12}}
                />
            </div>
        );
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
                            {this.renderMusicInformation()}
                            { this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Finish</StepLabel>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            { this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </Dialog>
        )
    }
}

UploadDialog.propTypes = propTypes;

export default UploadDialog;