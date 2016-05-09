import {inject} from 'aurelia-framework';
import {User} from './public/src/user'

@inject(User)
export class AuthInterceptor() {
	user;

	constructor(User){
		this.user = User;
	}

	request(config){
		var token = this.user.getToken();

		if(token){
			config.headers.Authorization = 'Bearer ' + token;
		}

		return config; 	 
	}

	response(response) {
		return response;
	}
}