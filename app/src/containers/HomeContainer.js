import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const propTypes = {};


class HomeContainer extends Component {
    constructor(props) {
        super(props);
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