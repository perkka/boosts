import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Request} from '../../services/request';

@Component({
   templateUrl: 'coach.html'
})
export class CoachPage {

  private Request : Request;
  name:string;
  description:string;
  workouts = null;

  constructor(private navCtrl: NavController, params:NavParams,request: Request) {

   let coachData = params.get("coachData")[0];
   console.log(coachData);
   this.name = coachData.Name;
   this.description = coachData.Description;
   //this.profileImg = coachData.profileImg;
   //this.coverImg = coachData.coverImg;
   this.Request = request;

   this.getWorkouts(coachData.id);

  }

  getWorkouts(id){
      this.Request.getWorkouts(id).subscribe(
            data => this.workouts = data
        );   
  }

  check() {
    var element = <HTMLInputElement> document.getElementById("myCheck");
    element.checked = true;
  }

  uncheck() {
    var element = <HTMLInputElement> document.getElementById("myCheck");
    element.checked = false;
  }

  

}
