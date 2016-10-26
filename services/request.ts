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

 private ipAdress = this.LocalIpAdres;
 
 private http;
 private data;
 private token;
 private tokenString = 'access_token='; 

  constructor(http: Http) {
    this.http = http;
 }

 // Set token to storage
  setToken(){

    NativeStorage.getItem('fbtoken')
      .then(
      data => this.token = data.property,
      error => console.error(error)
      );

  }

  // Empty Token 
  destroyToken(){
      this.token = "0";
  }

  checkAuth(prop){

       var url = this.ipAdress + '/auth/facebook/token?access_token=' + prop; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json()) 
  }


   getCategories(){

       var url = this.ipAdress + '/categories/all?access_token=' + this.token //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

   getMedals(){
       var url = this.ipAdress + '/achievements'; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }
  
  getCoaches(categoryId){ 
       var url = this.ipAdress + '/categories/' + categoryId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getUsers(userId){ 
       var url = this.ipAdress + '/users/' + userId + '?access_token=' + this.token;//+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getWorkouts(workout){
       var url = this.ipAdress + '/coaches/workouts' + workout; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getCoach(coachId){ 
       var url = this.ipAdress + '/coaches/' + coachId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }
  
  getWorkoutWeek(coachId){ 
       var url = this.ipAdress + '/workoutweeks/' + coachId; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

  getWrkExercises(exArray){
    var url = this.ipAdress + '/exercises/'; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        
      let body =  exArray;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body , options)
        .map(res => res.json())
  }

  followCoach(coachId){
        var url = this.ipAdress + '/users/' + coachId + "/follow" + '?access_token=' + this.token; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }
  
  unFollowCoach(coachId){
        var url = this.ipAdress + '/users/' + coachId + "/unfollow" + '?access_token=' + this.token; //+ encodeURI(movieName) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        return this.http.get(url)
        .map(res => res.json())
  }

}
