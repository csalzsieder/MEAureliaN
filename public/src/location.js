import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Locations {
  name;
  description;
  longitude;
  latitude;
  previousLocations = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:7000/locations/user')
         .withDefaults({
            headers: {
              'content-type': 'application/json',
            }
          });
    });

    this.http = http;
  }

  activate() {
  }

  submit(){

    var location = {
      userId: 1,
      name: this.name,
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude
    }
  	//make api call to save form
    var fetch = this.http.fetch('', {
      method: 'post',
      body: JSON.stringify(location)
    }).then(response =>{
      this.previousLocations.push(location);
    });

  	//if success add location data to previous locations
  }
}
