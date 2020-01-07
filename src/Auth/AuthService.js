// Create a service and instantiate auth0.WebAuth. Provide a method
// called login which calls the authorize method from auth0.js.

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'
import Profile from '@/library/profile2api'
import Friends from '../library/friends2api'
import EventAPI from '../library/event2api'
import Functions from '@/library/global'
import Logger from '../library/logger'
const logger = new Logger('error')

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor() {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'iambillmccann.auth0.com',
    clientID: 'xAcEHZHv6udK6HgA7KZeSc2CLZND660o',
    // redirectUri: 'https://letshang-app-v000.appspot.com/callback',
    // redirectUri: this.configRedirect,
    // redirectUri: ((new Functions()).environment() == 'development') ?
    redirectUri: (process.env.NODE_ENV == 'development') ?
      'http://lets-hang.test:8080/callback' : 'https://letshang-app-v000.appspot.com/callback',
    audience: 'https://iambillmccann.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile read:users read:user_idp_tokens'
  })

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        logger.debug('AuthService.vue', 'handleAuthentication', 'Authenticated correctly, call setSession')
        this.setSession(authResult)
        router.replace('/home')
      } else if (err) {
        logger.error('AuthService.vue', 'handleAuthentication', err.errorDescription)
        this.logout()
      } else if (!this.isAuthenticated()) {
        logger.critical('AuthService.vue', 'handleAuthentication', 'Problem authenticating, the app is logging out')
        this.logout()
      }
    })
  }

  setSession(authResult) {
    logger.debug('AuthService.vue', 'setSession', 'In AuthService setSession')
    let profileAPI = new Profile()
    profileAPI.GetProfile(authResult.idTokenPayload.sub) // retrieve the logged in user's profile
    let friendsAPI = new Friends()
    friendsAPI.GetFriends(authResult.idTokenPayload.sub) // retrieve the user's friend list
    let eventAPI = new EventAPI()
    eventAPI.GetEvents(authResult.idTokenPayload.sub) // retrieve the user's event list
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
    this.authNotifier.emit('authChange', {
      authenticated: true
    })
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('/')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAuth0Profile() {
    // ToDo: check the store to see if the profile is there
    //       return if it is
    let accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      logger.debug('AuthService.vue', 'getAuth0Profile', 'Access Token must exist to fetch profile')
    }
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        logger.error('AuthService.vue', 'getAuth0Profile', 'Auth0 returned an error obtaining user profile')
        return null
      }
      localStorage.setItem('profile', profile)
    })
  }
}
