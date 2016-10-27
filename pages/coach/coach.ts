import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Request} from '../../services/request';
import {Global} from '../../global/global';

@Component({
   templateUrl: 'coach.html'
})
export class CoachPage {


  public name:string;
  public description:string;
  public workouts = null;
  public coachId = null;
  public img = null;
  public follow: boolean = true;

  public added = false;

  private Request : Request;
  public AllUsers = null;
  Coaches: any;



  constructor(private navCtrl: NavController, params:NavParams, private request: Request, private global:Global) {

   let coachData = params.get("coachData")[0];
   this.coachId = coachData.id;
   this.name = coachData.Name;
   //this.description = coachData.Description;
   this.img = coachData.Img;
   this.description = coachData.Username;
   //this.profileImg = coachData.profileImg;
   //this.coverImg = coachData.coverImg;

   // Fatch on loading
   this.Request = request;
   this.getUser();


    this.getWorkouts(coachData.id);


    console.log(this.coachId);


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

    this.test();
  }

  uncheck() {
    var element = <HTMLInputElement> document.getElementById("myCheck");

    this.request.unFollowCoach(this.coachId).subscribe(
            data => element.checked = data
        );  
    this.test();
  }




  test(){
    if(this.Coaches.id == this.coachId){
     // this.follow = false;
    }
    else{
      //this.follow = true;
    }
  }





  getUser(){

    if(this.global.userData == null){
        this.Request.getUsers("10211165608959993").subscribe(
            data => this.setData(data) 
        );
     } else{

        this.setData(this.global.userData) 


     }
        
  }

  setData(users){

  this.global.userData = users;

    let coach = users[0].Coaches
    if(this.global.pickedCoaches == null){

          this.Request.getCoach(coach.id).subscribe(
            data => this.setCoaches(data)
        );
    } else this.setCoaches(this.global.pickedCoaches)

    this.AllUsers = users;
  }

  setCoaches(coaches){

        this.global.pickedCoaches = coaches; 
        this.Coaches = coaches;
        this.test();
        console.log(this.global.pickedCoaches.id);
        console.log(this.Coaches);

  }



  

}
