import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {MedalsPage} from '../medals/medals';
import {ProfilePage} from '../profile/profile'; 
import {Request} from '../../services/request';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/userdata';

import { Facebook } from 'ionic-native';
import { NativeStorage } from 'ionic-native';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public data;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private request: Request,  public userData: UserData) {
      
      this.request.setToken();
  }

// Checks if token is accepted on server
  checkAuthRequest(token){
    
      this.request.checkAuth(token).subscribe(
            data => this.data = data
      );

  }

_logout() {

      Facebook.logout().then((res) => {
          NativeStorage.remove('fbtoken')
          .then(
          () => this.logoutEvent(),
          error => alert("ERROR: Login couldn't load NativeStorage")
        );
       
      });
}

 logoutEvent(){

    this.request.destroyToken();
    this.navCtrl.push(LoginPage)
 }




}
