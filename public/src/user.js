//could add token to $window.storage

export class User {
  constructor () {
    this.loggedInUserId = null;
    this.cachedToken = null;
  }

  getToken() {
  	return this.cachedToken;
  }

  setToken(token) {
  	this.cachedToken = token;
  }

  removeToken() {
  	this.cachedToken = null;
  }

  isAuthenticated() {
  	return !!this.cachedToken;
  }
}
