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
    
  }

  activate() {
  }

  submit(){
  	//make api call to save form
    var test = this.name;
    var test2 = this.description;

  	//if success add location data to previous locations
  }
}
