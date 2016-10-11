import {EventEmitter} from 'events'
import Auth0Lock from 'auth0-lock'
import {isTokenExpired} from './jwtHelper'

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super();
        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, {});
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // binds login functions to keep this context
        this.login = this.login.bind(this)
    }

    _doAuthentication(authResult) {
        // Saves the user token
        this.setToken(authResult.idToken);
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            } else {
                this.setProfile(profile)
            }
        })
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    parseHash(hash) {
        // uses auth0 parseHash method to extract data from url hash
        const authResult = this.auth0.parseHash(hash);
        if (authResult && authResult.idToken) {
            this.setToken(authResult.idToken)
        }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        return !!this.getToken()
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
        // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }
}