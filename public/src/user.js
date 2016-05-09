//could add token to $window.storage

export class User {
  constructor () {
    this.loggedInUserId = null;
    this.cachedToken = null;
  }

  getToken() {
  	if(this.cachedToken) {
      return 'Bearer ' + this.cachedToken;
    }

    return null;
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
