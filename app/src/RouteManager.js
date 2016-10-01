import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router'

import * as routesActionsCreator from './actions/routes';

import HomeContainer from './containers/HomeContainer';
import PlayerContainer from './containers/PlayerContainer';

const propTypes = {
    history: PropTypes.object,
    routing: PropTypes.object,
};

class RouteManager extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={HomeContainer}/>
                <Route path="/songs" component={PlayerContainer}>
                    <Route path="/song/:songName" component={PlayerContainer}/>
                </Route>
            </Router>
        )
    }
}

RouteManager.propTypes = propTypes;

const mapStateToProps = state => ({
    routing: state.routing
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteManager);