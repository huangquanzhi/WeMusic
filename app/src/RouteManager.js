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

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
    auth.parseHash(nextState.location.hash);
    replace({pathname: '/'});
};


const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

class RouteManager extends Component {
    constructor(props) {
        super(props);
        this.parseAuthHash = this.parseAuthHash.bind(this);
    }

    componentDidMount() {
        const {userActions} = this.props;
        console.log("Auth " + auth.loggedIn());
        console.log(auth.getToken());
        if (auth.loggedIn()) {
            userActions.isLoggedIn(true);
            userActions.setIdToken(auth.getToken());
            userActions.setProfile(auth.getProfile());
        }
    }

    parseAuthHash() {
        console.log("Parse")
    }

    render() {
        const {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/">
                    <IndexRedirect to="home"/>
                    <Route path="home" component={HomeContainer} auth={auth}/>
                    <Route path="home#access_token" onEnter={this.parseAuthHash}/>
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
    routing: state.routing,
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActionsCreator, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouteManager);