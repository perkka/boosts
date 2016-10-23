import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

import { Facebook } from 'ionic-native';
import { NativeStorage } from 'ionic-native';

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController, private platform : Platform) {


 platform.ready().then((readySource) => {

  Facebook.browserInit(910719762366712, 'v2.7'); 

  Facebook.getLoginStatus()
        .then(
          status => this.succes(status),
          error => console.log("Not Logged in")
        );
  })
  
};

  login() {



    Facebook.login(['public_profile']).then((res) => {

      Facebook.getAccessToken().then((res) => {
   
        NativeStorage.setItem('fbtoken', {property: res})
        .then(
          () => this.navCtrl.push(TabsPage),
          error => alert("ERROR: Login couldn't load NativeStorage")
        );
      });
      
  });    
  }


   succes(sta){
     if(sta.status == "connected"){

        this.navCtrl.push(TabsPage)

     }
   }



}
