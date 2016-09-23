import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {ChromePicker, SketchPicker, CirclePicker} from 'react-color';

const propTypes = {
};


class ColorPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="color-picker">

                    <ChromePicker />
            </div>
        );

    }
}

ColorPicker.propTypes = propTypes;

export default ColorPicker;