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

    this.request.getWorkoutWeek("791f5e43-af95-4a50-bb3a-e4be84b008ad").subscribe(
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
