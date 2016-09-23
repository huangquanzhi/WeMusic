import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
};


class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {isOpen, onChange} = this.props;

        return (
            <Drawer
                docked={false}
                openSecondary={true}
                width={200}
                open={isOpen}
                onRequestChange={onChange}
            >
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
        );

    }
}

Settings.propTypes = propTypes;

export default Settings;