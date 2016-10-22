import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

import { Facebook } from 'ionic-native';
import { NativeStorage } from 'ionic-native';

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController) {
  
    Facebook.browserInit(910719762366712, 'v2.7'); 

  }

  login() {

    Facebook.login(['public_profile']).then((res) => {

      Facebook.getAccessToken().then((res) => {
        alert(res);
        NativeStorage.setItem('myitem', {property: res})
        .then(
          () => this.navCtrl.push(TabsPage),
          error => alert("hej")
        );
      
      
   
      
      });
      
  });    
  }


   succes(){
     this.navCtrl.push(TabsPage)
   }


     error(){
      Facebook.logout().then((res) => {
        NativeStorage.remove("myitem");
        this.navCtrl.push(LoginPage);
      });
   
   }


}
