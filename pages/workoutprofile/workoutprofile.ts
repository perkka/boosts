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

    this.getUser();
    
  }

// TODO: User information doesn't need to be here, possible change to use profile info 
//       from server or load this information direct on start of application
  getUser(){
    
    if(this.global.userData == null){
        this.request.getUsers("42c39126-8c33-42b4-9cb5-3ab1ce336dd7").subscribe(
            data => this.setData(data) 
        );
     } else{

        this.setData(this.global.userData) 


     }
        
  }

  setData(users){

   this.global.userData = users;

    let coach = JSON.parse(users[0].Coaches)
    if(this.global.pickedCoaches == null){

          this.request.getCoach(coach[0].id).subscribe(
            data => this.setCoaches(data)
        );
    } else this.setCoaches(this.global.pickedCoaches)

    
  }

  setCoaches(coaches){

        this.global.pickedCoaches = coaches; 
        this.pickedCoaches = coaches;

        this.showWorkoutWeek(this.pickedCoaches.id);

  }


  showWorkoutWeek(id){

    return this.request.getWorkoutWeek(id).subscribe(
            data => this.setWrkWeek(data)
    );



  }

  doRefresh(refresh){

    this.showWorkoutWeek(this.pickedCoaches.id)

    refresh.complete()

  
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
