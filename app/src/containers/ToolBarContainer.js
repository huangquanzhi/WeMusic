import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import * as applicationCreator from '../actions/application';

import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';


import Settings from '../components/Settings';

const propTypes = {
    application: PropTypes.object,
    applicationActions: PropTypes.object,
};


class ToolBarContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSettingsRequest = this.handleSettingsRequest.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
    }

    handleSettingsRequest() {
        const {application, applicationActions} = this.props;
        applicationActions.isSettingShowing(!application.settings.isOpen);
    }

    renderToolbar() {
        return (
            <Toolbar className="toolbar">
                <ToolbarGroup
                    firstChild={true}
                />
                <ToolbarGroup
                    lastChild={true}
                    style={{
                        marginRight: '2%'
                    }}
                >
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
                    isOpen={application.settings.isOpen}
                    onChange={this.handleSettingsRequest}
                />
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
        applicationActions: bindActionCreators(applicationCreator, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolBarContainer));