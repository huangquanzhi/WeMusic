import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IndexRedirect, Router, Route} from 'react-router'
import AuthService from './utils/AuthService'

import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from './constants/application';
import * as routesActionsCreator from './actions/routes';

import HomeContainer from './containers/HomeContainer';
import PlayerContainer from './containers/PlayerContainer';

const propTypes = {
    history: PropTypes.object,
    routing: PropTypes.object,
};

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
    console.log("Parse........................")
    auth.parseHash(nextState.location.hash);
    replace({pathname: '/'});
};


const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

class RouteManager extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/">
                    <IndexRedirect to="/home"/>
                    <Route path="home" component={HomeContainer} auth={auth}/>
                    <Route path="access_token=:token" onEnter={parseAuthHash}/>
                </Route>

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