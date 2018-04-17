// Create a service and instantiate auth0.WebAuth. Provide a method
// called login which calls the authorize method from auth0.js.

import auth0 from 'auth0-js'
// import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'
import store from '@/store'

export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'iambillmccann.auth0.com',
    clientID: 'xAcEHZHv6udK6HgA7KZeSc2CLZND660o',
    redirectUri: 'http://lets-hang.test:9080/callback',
    audience: 'https://iambillmccann.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile read:users read:user_idp_tokens'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('/home')
      } else if (err) {
        alert(err)
        console.log(err)
        this.logout()
      } else if (!this.isAuthenticated()) {
        this.logout()
      }
    })
  }

  setSession (authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('sub', authResult.idTokenPayload.sub) // This will be used as the user secret id (temporarily)
    store.commit('getMyProfile', authResult.idTokenPayload.sub) // retrieve the logged in user's profile
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
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

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAuth0Profile () {
    // ToDo: check the store to see if the profile is there
    //       return if it is
    let accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      console.log('Access Token must exist to fetch profile')
    }
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        console.log('Auth0 returned an error obtaining user profile')
        return null
      }
      localStorage.setItem('profile', profile)
    })
  }
}
