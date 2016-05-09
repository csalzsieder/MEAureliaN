import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {User} from './user'

@inject(HttpClient, User)
export class Locations {
  name;
  description;
  longitude;
  latitude;
  previousLocations = [];
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

  activate() {
    var uri = '/' + this.user.loggedInUserId + '/locations'

    var fetch = this.http.fetch(uri, {})
    .then(response => response.json())
    .then(data => {

      for (var i = 0; i < data.length; i++) {
        var location = {
          name: data[i].name,
          description: data[i].description,
          longitude: data[i].longitude,
          latitude: data[i].latitude
        }

        this.previousLocations.push(location);  
      }
    });
  }

  submit(){
    var location = {
      userId: this.user.loggedInUserId,
      name: this.name,
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude
    }
  	
    var fetch = this.http.fetch('/locations', {
      method: 'post',
      body: JSON.stringify(location)
    }).then(response =>{
      this.previousLocations.push(location);
      this.name = '';
      this.description = '';
      this.longitude = '';
      this.latitude = '';
    });

  	//if success add location data to previous locations
  }
}
