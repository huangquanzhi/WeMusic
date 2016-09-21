import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as jQuery from 'jquery';

const propTypes = {};


class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(jQuery.('.segment-select'));

    }

    render() {
        return (
            <main>
                <div>
                    <select className="segment-select">
                        <option value="paper" className="itrade-paper">Paper</option>
                        <option value="paperless" className="itrade-paperless">Paperless</option>
                        <option value="both" className="itrade-both">Both</option>
                    </select>
                </div>
            </main>
        );
    }
}

HomeContainer.propTypes = propTypes;


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);