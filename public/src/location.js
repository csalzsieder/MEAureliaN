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
        .withBaseUrl('http://localhost:7000/api/user')
         .withDefaults({
            headers: {
              'content-type': 'application/json',
            }
          });
    });

    this.http = http;
  }

  activate() {
    var uri = '/' + 1 + '/locations'

    var fetch = this.http.fetch(uri, {
    })
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
      };
    });
  }

  submit(){
    var location = {
      userId: 1,
      name: this.name,
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude
    }
  	
    var uri = '/' + location.userId + '/locations'

    var fetch = this.http.fetch(uri, {
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
