import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AuthService from '../utils/AuthService'
import * as applicationCreator from '../actions/application';
import * as userCreator from '../actions/user';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

import Settings from '../components/Settings';
import UploadDialog from '../components/UploadDialog';


const propTypes = {
    application: PropTypes.object,
    applicationActions: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService),
    title: PropTypes.string,
    user: PropTypes.object,
    userActions: PropTypes.object
};


class ToolBarContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSettingsRequest = this.handleSettingsRequest.bind(this);
        this.handleColorPickerRequest = this.handleColorPickerRequest.bind(this);
        this.handleUploadDialogRequest = this.handleUploadDialogRequest.bind(this);
        this.renderLoggedInItems = this.renderLoggedInItems.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.state = {
            showUploadDialog: false,
        }
    }

    handleSettingsRequest() {
        const {application, applicationActions} = this.props;
        applicationActions.isSettingShowing(!application.settings.isOpen);
    }

    handleColorPickerRequest() {
        const {application, applicationActions} = this.props;
        applicationActions.isColorPickerShow(!application.isPickerShow);
    }

    handleUploadDialogRequest() {
        this.setState({
            showUploadDialog: !this.state.showUploadDialog
        })
    }

    // only render when logged in
    renderLoggedInItems() {
        const {user} = this.props;
        if (user.loggedIn) {
            return (
                <div>
                    <FlatButton label="Upload" onClick={this.handleUploadDialogRequest}/>
                    <ToolbarSeparator/>
                </div>
            )
        }
    }

    renderToolbar() {
        const {application, title} = this.props;
        return (
            <Toolbar
                className="toolbar"
                style={{backgroundColor: application.settings.theme.toolbarColor}}
            >
                <ToolbarGroup
                    firstChild={true}
                />
                <ToolbarGroup>
                    <ToolbarTitle text={title}/>
                </ToolbarGroup>
                <ToolbarGroup
                    lastChild={true}
                    style={{
                        marginRight: '1%'
                    }}
                >
                    { this.renderLoggedInItems() }
                    <IconButton onClick={this.handleSettingsRequest}>
                        <ActionSettings/>
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>
        )
    }

    render() {
        const {application} = this.props;

        return (
            <div>
                { this.renderToolbar() }
                <Settings
                    {...this.props}
                    isOpen={application.settings.isOpen}
                    onChange={this.handleSettingsRequest}
                />
                <UploadDialog isOpen={this.state.showUploadDialog} onRequest={this.handleUploadDialogRequest}/>
            </div>
        )
    }
}

ToolBarContainer.propTypes = propTypes;


function mapStateToProps(state) {
    return {
        application: state.application
    };
}

function mapDispatchToProps(dispatch) {
    return {
        applicationActions: bindActionCreators(applicationCreator, dispatch),
        userActions: bindActionCreators(userCreator, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolBarContainer));