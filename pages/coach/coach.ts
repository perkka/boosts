import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Request} from '../../services/request';

@Component({
   templateUrl: 'coach.html'
})
export class CoachPage {


  public name:string;
  public description:string;
  public workouts = null;
  public coachId = null;
  public img = null;

  public added = false;



  constructor(private navCtrl: NavController, params:NavParams, private request: Request) {

   let coachData = params.get("coachData")[0];
   this.coachId = coachData.id;
   this.name = coachData.Name;
   //this.description = coachData.Description;
   this.img = coachData.Img;
   this.description = coachData.Username;
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

    this.request.unFollowCoach(this.coachId).subscribe(
            data => element.checked = data
        );  
  }

  test(){
    
  }

  

}
