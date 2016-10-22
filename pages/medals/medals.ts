import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Request} from '../../services/request';


@Component({
   templateUrl: 'medals.html'
})
export class MedalsPage {



  // Here is All Medals :)
  allMedals = null;
  private Request: any;

  constructor(private navCtrl: NavController, request: Request) {
    
    this.Request = request;
    this.getMedals();
  }

  getMedals(){
    
      this.Request.getMedals().subscribe(
            data => this.allMedals = data
        );
      
  }

}
