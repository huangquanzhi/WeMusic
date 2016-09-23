import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {ChromePicker, SketchPicker, CirclePicker} from 'react-color';

const propTypes = {
    color: PropTypes.string,
    onChangeComplete: PropTypes.func,
};


class ColorPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {color, onChangeComplete} = this.props;
        return (
            <div className="color-picker">
                <ChromePicker
                    color={color}
                    onChangeComplete={onChangeComplete}
                />
            </div>
        );

    }
}

ColorPicker.propTypes = propTypes;

export default ColorPicker;