import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TrainingPage } from '../pages/training/training';
import { WorkoutProfilePage } from '../pages/workoutprofile/workoutprofile';
import { CategoryPage } from '../pages/category/category';
import { CoachPage } from '../pages/coach/coach';
import { LoginPage } from '../pages/login/login';
import { MedalsPage } from '../pages/medals/medals';
import { NewcoachesPage } from '../pages/newcoaches/newcoaches';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { PopularPage } from '../pages/popular/popular';
import { TabsPage } from '../pages/tabs/tabs';
import { ToplistPage } from '../pages/toplist/toplist';
import { WorkoutPage } from '../pages/workout/workout';
import { ExplorePage } from '../pages/explore/explore';
import { Facebook } from 'ionic-native';
import {Request} from '../services/request';

import { UserData } from '../providers/userdata';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    TrainingPage,
    WorkoutProfilePage,
    CategoryPage,
    CoachPage,
    LoginPage,
    MedalsPage,
    NewcoachesPage,
    ProfilePage,
    SearchPage,
    PopularPage,
    ToplistPage,
    WorkoutPage,
    ExplorePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    TrainingPage,
    WorkoutProfilePage,
    CategoryPage,
    CoachPage,
    LoginPage,
    MedalsPage,
    NewcoachesPage,
    ProfilePage,
    SearchPage,
    WorkoutPage,
    ExplorePage
  ],
  providers: [Request, Storage, Facebook]
})
export class AppModule {}
