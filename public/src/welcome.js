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

  constructor(http, User) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:7000/api')
         .withDefaults({
            headers: {
              'content-type': 'application/json',
            }
          });
    });

    this.user = User;
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
      this.clearForm();
      this.user.loggedInUserId = data.user._id;
    });
  }

  register() {
    var user = this.getUserCreds();

    var fetch = this.http.fetch('/register', {
      method: 'post',
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      this.clearForm();
      this.user.loggedInUserId = data.user._id;
    });
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