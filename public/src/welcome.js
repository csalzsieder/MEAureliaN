//import {computedFrom} from 'aurelia-framework';

export class Welcome {
  heading = 'Login';
  userName;
  password;

  submit() {
    alert("submit")
  }

  signUp() {
    alert("sign up")
  }

}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
