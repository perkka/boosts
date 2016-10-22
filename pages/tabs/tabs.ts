import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {WorkoutProfilePage} from '../workoutprofile/workoutprofile';
import {ProfilePage} from '../profile/profile';
import {ExplorePage} from '../explore/explore';
import {SearchPage} from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ExplorePage;
    this.tab3Root = WorkoutProfilePage;
    this.tab4Root = SearchPage;
    this.tab5Root = ProfilePage;
  }
}
