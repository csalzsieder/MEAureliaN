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
        .withBaseUrl('http://localhost:7000/api/user')
         .withDefaults({
            headers: {
              'content-type': 'application/json',
            }
          });
    });

    this.user = User;
    this.http = http;
  }

  submit() {
    var uri = '/?username=' + this.userName + '&password=' + this.password;

    var fetch = this.http.fetch(uri, {})
    .then(response => response.json())
    .then(data => {
      this.clearForm()
      this.user.loggedInUserId = data[0]._id;
    });
  }

  signUp() {
    var user = {
      userName: this.userName,
      password: this.password
    }

    var fetch = this.http.fetch('', {
      method: 'post',
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      this.clearForm();
      this.user.loggedInUserId = data._id;
    });
  }

  clearForm(){
      this.userName = '';
      this.password = ''; 
  }

}