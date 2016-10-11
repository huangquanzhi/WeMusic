import React, {Component, PropTypes} from 'react'
import AuthService from '../utils/AuthService'

const propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
};

class Login extends Component {
    render() {
        const {auth} = this.props;
        return (
            <div>
                <h2>Login</h2>
                <button onClick={auth.login.bind(this)}>Login</button>
            </div>
        )
    }
}

Login.propTypes = propTypes;

export default Login;