import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';


@Injectable()
export class Request {

// Used Outside Perkkas Place :)
 private ExternalIpAdress = "http://2.68.167.57:3000";

 // Used At PerkKas Place :)

 private LocalIpAdres = "http://192.168.1.2:4000";

 
 private http;
 private data;
 private token;

  constructor(http: Http) {
    this.http = http;

    
    
  }

   getCategories(prop){
         alert(prop);
       var url = this.LocalIpAdres + '/categories/all?access_token=' + prop; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

   getMedals(){
       var url = this.LocalIpAdres + '/achievements'; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }
  
  getCoaches(categoryId){ 
       var url = this.LocalIpAdres + '/categories/' + categoryId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getUsers(userId){ 
       var url = this.LocalIpAdres + '/users/' + userId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getWorkouts(workout){
       var url = this.LocalIpAdres + '/coaches/workouts' + workout; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getCoach(coachId){ 
       var url = this.LocalIpAdres + '/coaches/' + coachId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }
  
  getWorkoutWeek(coachId){ 
       var url = this.LocalIpAdres + '/workoutweeks/' + coachId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getWrkExercises(exArray){
    var url = this.LocalIpAdres + '/exercises/'; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        
      let body =  exArray;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body , options)
        .map(res => res.json())
  }

}
