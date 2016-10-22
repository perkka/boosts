import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {MedalsPage} from '../medals/medals';
import {ProfilePage} from '../profile/profile'; 

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/userdata';

import { Facebook } from 'ionic-native';
import { NativeStorage } from 'ionic-native';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public data;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController,  public userData: UserData) {

      NativeStorage.getItem('myitem')
      .then(
      data => this.data = data.property,
      error => console.error(error)
      );
  
  }

_logout() {

      Facebook.logout().then((res) => {
        this.navCtrl.push(LoginPage);
      });
}

_profile() {
    this.navCtrl.push(ProfilePage);
  }


}
