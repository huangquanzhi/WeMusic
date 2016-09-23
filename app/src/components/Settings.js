import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ColorPicker from '../components/ColorPicker';

const propTypes = {
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
};


class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleColorPickerRequest = this.handleColorPickerRequest.bind(this);
    }

    handleColorPickerRequest(themeSetting, status) {
        const {application, applicationActions} = this.props;
        applicationActions.isColorPickerShow(!application.isPickerShow);
    }

    render() {
        const {application, isOpen, onChange} = this.props;

        return (
            <Drawer
                docked={false}
                openSecondary={true}
                width={250}
                open={isOpen}
                onRequestChange={onChange}
            >
                <MenuItem primaryText="Player Color"/>
                <MenuItem primaryText="Toolbar Color"/>
                <MenuItem primaryText="Color Color"/>
                <Divider/>
                <MenuItem primaryText="Themes" disabled/>
                <Divider/>
                <MenuItem>
                    <p>Player Color</p>
                    <ColorPicker/>
                </MenuItem>
                <MenuItem primaryText="Toolbar Color"/>
                <MenuItem primaryText="Color Color"/>
            </Drawer>
        );

    }
}

Settings.propTypes = propTypes;

export default Settings;