import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

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
                <h1>Upload</h1>
            </Dialog>
        )
    }
}

UploadDialog.propTypes = propTypes;

export default UploadDialog;