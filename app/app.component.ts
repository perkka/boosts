import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from '../pages/login/login';
import {Request} from '../services/request';
import {Global} from '../global/global';
import {Utils} from '../global/utils';
import {TabsPage} from '../pages/tabs/tabs';
import { UserData } from '../providers/userdata';

@Component({
  template: '<ion-nav [root]="loginPage"></ion-nav>',
  providers: [Request, Global, UserData]
})
export class MyApp {

  public rootPage: any;
  public loginPage: any;
  public tabsPage: any;

  constructor(private platform: Platform,  public userData: UserData) {

      // decide which menu items should be hidden by current login status stored in local storage
    
    this.loginPage = LoginPage;
    this.tabsPage = TabsPage;

    platform.ready().then(() => {
  

      StatusBar.styleDefault();
    });
  }
}

