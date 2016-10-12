import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dropzone from 'react-dropzone';

const propTypes = {
    onRequest: PropTypes.func,
    isOpen: PropTypes.bool
};

class UploadDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onRequest, isOpen} = this.props;
        return (
            <Dialog
                title="Upload"
                modal={false}
                open={isOpen}
                onRequestClose={onRequest}
                autoScrollBodyContent={true}
            >
                <Stepper activeStep={0} orientation="vertical">
                    <Step>
                        <StepLabel>Choose a music</StepLabel>
                        <StepContent>
                            <Dropzone className="file__drop">
                                <div className="file__drop-zone">
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
                                </div>
                            </Dropzone>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Music Information</StepLabel>
                        <StepContent>
                            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
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
                        </StepContent>
                    </Step>
                </Stepper>
            </Dialog>
        )
    }
}

UploadDialog.propTypes = propTypes;

export default UploadDialog;