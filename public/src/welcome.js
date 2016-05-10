import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {User} from './user'

@inject(HttpClient, User)
export class Welcome {
  heading = 'Login';
  userName;
  password;
  ea;
  user;
  isUserLoggedIn;

  constructor(http, User) {
    http.configure(config => {
      config
        .withBaseUrl('http://localhost:7000/api')
        .withDefaults({ headers: {'content-type': 'application/json'}})
    });

    this.user = User;
    this.isUserLoggedIn = this.user.isAuthenticated();
    this.http = http;
  }

  login() {
    var user = this.getUserCreds();    

    var fetch = this.http.fetch('/login', {
      method: 'post',
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      this.formSuccess(data);
    })
    .catch(error => {
      alert("Invalid credentials");
    });
  }

  register() {
    var user = this.getUserCreds();

    if(this.userName == null || this.password == null){
      alert("unable to register");
      return;
    }

    var fetch = this.http.fetch('/register', {
      method: 'post',
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      this.formSuccess(data);
    })
    .catch(error => {
      alert("unable to register");
    });;
  }

  logOut() {
    this.user.removeToken();
    this.isUserLoggedIn = this.user.isAuthenticated();
  }

  formSuccess(data) {
      this.clearForm();
      this.user.loggedInUserId = data.user._id;
      this.user.setToken(data.token);
      this.isUserLoggedIn = this.user.isAuthenticated();
  }

  clearForm(){
      this.userName = '';
      this.password = ''; 
  }

  getUserCreds() {
    return {
      userName: this.userName,
      password: this.password
    }
  }

}