import {inject} from 'aurelia-framework';
import {User} from './user'

@inject(User)

class AuthStep {
	user;

	constructor(User) {
		this.user = User;
	}

	run(routingContext,next) {
	     if (routingContext.nextInstructions.some(i => i.config.auth)) {
            var isLoggedIn = AuthorizeStep.isLoggedIn();
            if (!isLoggedIn) {
                alert("Not Logged In!\nClick the Sign In icon to log in");
                return next.cancel();
            }
        }
        return next();
	}

	isLoggedIn() {
        return this.user.isAuthenticated();
    }
}