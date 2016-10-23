import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Global} from '../../global/global';
import {Request} from '../../services/request';
import {TrainingPage} from '../training/training';

@Component({
   templateUrl: 'workout.html'
})
export class WorkoutPage {

 public work;
 timeEx: number = 2;
 startUpTime: number = 3;

  constructor(private navCtrl: NavController, params:NavParams,request: Request, global: Global,
              public loadingCtrl: LoadingController) {

   let workout = params.get("Workout")[0];
   this.work = workout;


  }






  _Training(){

let loading = this.loadingCtrl.create({
    content: 'Loading Please Wait...'
  });

  loading.present();

  setTimeout(() => {
    this.navCtrl.push(TrainingPage,{
         Workout: this.work,
         TimeBetweenExcercise: this.timeEx,
         StartUpTime: this.startUpTime
    });;
  }, 500);

  setTimeout(() => {
    loading.dismiss(); 
  }, 1000);


  }


}