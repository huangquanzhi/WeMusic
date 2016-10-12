import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IndexRedirect, Router, Route} from 'react-router'
import AuthService from './utils/AuthService'

import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from './constants/application';
import * as userActionsCreator from './actions/user';

import HomeContainer from './containers/HomeContainer';
import PlayerContainer from './containers/PlayerContainer';

const propTypes = {
    history: PropTypes.object,
    routing: PropTypes.object,
    userActions: PropTypes.object,
};

const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

class RouteManager extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {userActions} = this.props;
        auth.setAuthenticatedActions(this.props.userActions);
        if (auth.loggedIn()) {
            userActions.isLoggedIn(true);
            userActions.setProfile(auth.getProfile());
            userActions.setIdToken(auth.getToken());
        }
    }

    render() {
        const {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={HomeContainer} auth={auth}/>
                <Route path="/songs" component={PlayerContainer}>
                    <Route path="/song/:songName" component={PlayerContainer}/>
                </Route>
            </Router>
        )
    }
}

RouteManager.propTypes = propTypes;

const mapStateToProps = state => ({
    routing: state.routing,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActionsCreator, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteManager);