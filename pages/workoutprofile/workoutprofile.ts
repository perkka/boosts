import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Global} from '../../global/global';
import {Request} from '../../services/request';
import {WorkoutPage} from '../workout/workout';

@Component({
   templateUrl: 'workoutprofile.html'
})
export class WorkoutProfilePage {

  pickedCoaches:any = null;
  wrkWeek:any = null;
  weekInfo:any = {
    id: 1
  };


  constructor(private navCtrl: NavController, private global:Global , private request:Request) {

    this.pickedCoaches = global.pickedCoaches;
    this.showWorkoutWeek();
  }


  showWorkoutWeek(){

    this.request.getWorkoutWeek("e7667c6e-1bbd-4c1e-a1ad-b04c7ff776b1").subscribe(
            data => this.setWrkWeek(data)
        );



  }


  setWrkWeek(data){

    
  let test = data.workouts;
  let testArray = [];
  this.weekInfo = data.week;
  console.log(this.weekInfo);

      for(let wrk in test){


        testArray.push(test[wrk]); 


      }
  console.log(testArray);
  this.wrkWeek = testArray;
  
  }


_descWorkout(wrkObj){
  
  console.log(wrkObj)
  this.navCtrl.push(WorkoutPage,{
            Workout: wrkObj
  });

}

}
