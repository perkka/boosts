import {Component, ViewChild} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import {Request} from '../../services/request';
import {Global} from '../../global/global';

@Component({
    templateUrl: 'profile.html'
})
export class ProfilePage {

  @ViewChild(Content) content: Content;


  public position: any;
  private Request : Request;
  AllUsers = null;
  Coaches:any;

  constructor(private navCtrl: NavController, request: Request, private global:Global) {

  // Fatch on loading
  this.Request = request;
  this.getUser();


  }

  
onPageScroll() {
  console.log('They see me scrolling...');
}
 

  ngAfterViewInit() {
       // this.content.addScrollListener(this.onPageScroll);
    }

  // Get User from Server
  getUser(){

    if(this.global.userData == null){
        this.Request.getUsers("42c39126-8c33-42b4-9cb5-3ab1ce336dd7").subscribe(
            data => this.setData(data) 
        );
     } else{

        this.setData(this.global.userData) 


     }
        
  }

  setData(users){

  this.global.userData = users;

    let coach = JSON.parse(users[0].Coaches)
    if(this.global.pickedCoaches == null){

          this.Request.getCoach(coach[0].id).subscribe(
            data => this.setCoaches(data)
        );
    } else this.setCoaches(this.global.pickedCoaches)

    this.AllUsers = users;
  }

  setCoaches(coaches){

        this.global.pickedCoaches = coaches; 
        this.Coaches = coaches;

  }

/*
  tapEvent(e){
    this.tap++
  }
*/

// Hej Pär, ser du mig?



}
