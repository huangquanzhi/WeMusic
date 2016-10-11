import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ColorPicker from '../components/ColorPicker';
import NavClose from 'material-ui/svg-icons/navigation/close';

const propTypes = {
    application: PropTypes.object,
    applicationAction: PropTypes.object,
    auth: PropTypes.object,
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
};


class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleColorPickerRequest = this.handleColorPickerRequest.bind(this);
        this.handleToolbarColorComplete = this.handleToolbarColorComplete.bind(this);
        this.handlePlayerColorComplete = this.handlePlayerColorComplete.bind(this);
    }

    handleColorPickerRequest() {
        const {application, applicationActions} = this.props;
        applicationActions.isColorPickerShow(!application.isPickerShow);
    }

    handleToolbarColorComplete(color) {
        const {applicationActions} = this.props;
        applicationActions.setToolbarColor(color.hex);
    }

    handlePlayerColorComplete(color) {
        const {applicationActions} = this.props;
        applicationActions.setPlayerColor(color.hex);
    }

    render() {
        const {application, auth, isOpen, onChange} = this.props;

        return (
            <Drawer
                docked={false}
                openSecondary={true}
                width={280}
                open={isOpen}
                onRequestChange={onChange}
            >
                <MenuItem
                    onTouchTap={onChange}
                >
                    <NavClose style={{
                        width: 48,
                        height: 48,
                        marginLeft: '41%'
                    }}/>
                </MenuItem>
                <MenuItem primaryText="Login" onClick={auth.login.bind(this)}/>
                <MenuItem primaryText="Profile"/>
                <Divider/>
                <MenuItem primaryText="Themes" disabled/>
                <Divider/>
                <MenuItem>
                    <p>Player Color</p>
                    <ColorPicker
                        color={application.settings.theme.playerColor}
                        onChangeComplete={this.handlePlayerColorComplete}
                    />
                </MenuItem>
                <MenuItem>
                    <p>Toolbar Color</p>
                    <ColorPicker
                        color={application.settings.theme.toolbarColor}
                        onChangeComplete={this.handleToolbarColorComplete}
                    />
                </MenuItem>
            </Drawer>
        );

    }
}

Settings.propTypes = propTypes;

export default Settings;