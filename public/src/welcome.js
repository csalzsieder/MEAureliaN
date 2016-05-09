import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Welcome {
  heading = 'Login';
  userName;
  password;

  constructor(http) {
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

    this.http = http;
  }

  submit() {
    var uri = '/?username=' + this.userName + '&password=' + this.password;

    var fetch = this.http.fetch(uri, {})
    .then(response => response.json())
    .then(data => {
      var test = data;
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
    }).then(response =>{
      this.userName = '';
      this.password = '';
    });
  }

}