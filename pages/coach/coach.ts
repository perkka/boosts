import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Request} from '../../services/request';

@Component({
   templateUrl: 'coach.html'
})
export class CoachPage {


  name:string;
  description:string;
  workouts = null;
  coachId = null;

  added = false;

  constructor(private navCtrl: NavController, params:NavParams,private request: Request) {

   let coachData = params.get("coachData")[0];
   this.coachId = coachData.id;
   this.name = coachData.Name;
   this.description = coachData.Description;
   //this.profileImg = coachData.profileImg;
   //this.coverImg = coachData.coverImg;


   this.getWorkouts(coachData.id);

  }

  getWorkouts(id){
      this.request.getWorkouts(id).subscribe(
            data => this.workouts = data
        );   
  }

  check() {
    var element = <HTMLInputElement> document.getElementById("myCheck");

    
    this.request.followCoach(this.coachId).subscribe(
            data => element.checked = data
        );  
  }

  uncheck() {
    var element = <HTMLInputElement> document.getElementById("myCheck");
    element.checked = false;
  }

  

}
