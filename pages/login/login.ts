import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

import { Facebook } from 'ionic-native';
import { NativeStorage } from 'ionic-native';
//mport {FacebookService, FacebookLoginResponse, FacebookInitParams} from 'ng2-facebook-sdk/dist';


@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController, private platform : Platform, public fb: FacebookService) {


 platform.ready().then((readySource) => {

/*
  let fbParams: FacebookInitParams = {
                                   appId: '910719762366712',
                                   xfbml: true,
                                   version: 'v2.7'
                                   };
    this.fb.init(fbParams);
*/

 /*if (this.platform.is('mobile')) {*/
    
  Facebook.browserInit(910719762366712, 'v2.7'); 

  Facebook.getLoginStatus()
        .then(
          status => this.succes(status),
          error => console.log("Not Logged in")
        );
  /*}
   else{

     this.fb.getLoginStatus().then(
       status => this.succes(status),
          error => console.log("Not Logged in")
    );

    }*/

     });
  
};

  login() {
/*
   this.fb.login().then(
      (response: FacebookLoginResponse) => this.navCtrl.push(TabsPage),
      (error: any) => console.error(error)
    );*/

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




  
    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
              this.navCtrl.push(TabsPage)
        }else if (resp.status === 'not_authorized') {
            
        }else {
            
        }
    };



}
