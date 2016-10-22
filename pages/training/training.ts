import {Component, ViewEncapsulation} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Global} from '../../global/global';
import {Request} from '../../services/request';
import {HomePage} from '../home/home';




@Component({
    templateUrl: 'training.html',
    encapsulation: ViewEncapsulation.None,
})
export class TrainingPage {

  public time: any = 2000;
  public trainingHasStarted: boolean = false;
  public nr: any = 0;
  public check: boolean = true;
  public theTimer: any;
  public sec: any = 0;
  public min: any = 0;
  public h: any = 0;
  public zero1: string = "0";
  public zero2: string = "0";
  public zero3: string = "0";

  public exercises = [];
  public currentExercise = {Name: "Excersise", Description:"Description"};

  constructor(private navCtrl: NavController, params:NavParams, private request: Request, 
              global: Global, public alertCtrl: AlertController, private viewCtrl: ViewController) {

      

      let workout = params.get("Workout")


      let ExerciseArray = [];
      let exObjArray = []

      for(let exercise in workout.Exercises){

        let exObj = JSON.parse(workout.Exercises[exercise]);
        exObjArray.push(exObj)
        // TODO: Remove substring when fixed space problem in database/admin
        if(exObj.id != null) ExerciseArray.push(exObj.id.substring(0, exObj.id.length - 1)); 
       
        }
        
      this.request.getWrkExercises(ExerciseArray).subscribe(
            data => this.setExercises(data, exObjArray)
      );
  }



  startTraining(){

    // start training boolean
    this.trainingHasStarted = true;

    let start = document.querySelector(".start");
    let inTraining = document.querySelector(".inTraining");

    // so we can't go back in a traing session
    this.viewCtrl.showBackButton(false);
    // hide and show fab buttons
    start["style"].display = "none";
    inTraining["style"].display = "flex";
    setTimeout( () => this.showNext() , this.time);
    
    // start timer
    this.startTimer();
    
    // start all excersises
    this.nr = 0;
    this.nextExerInTraining(this.nr);

  }


  inTraining(){

    let stop = document.querySelector(".stop");
    let pause = document.querySelector(".pause");

    stop["style"].display = "flex";
    pause["style"].display = "flex";

  }


  stopTraining(){

    this.endTraining();
    this.nr = 0;


  }

  pauseTraining(fab){

    fab.close();
    clearTimeout(this.theTimer);

    // Fab buttons
    let start = document.querySelector(".start");
    start["style"].display = "flex";

    let inTraining = document.querySelector(".inTraining");
    inTraining["style"].display = "none";
    // Pause training boolean
    this.trainingHasStarted = false;
    
  }


// Alert if user try to stop in middle of training
   endTraining() {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to end the training?',
      message: 'If you end your training you will not be able to continue it later. If you want to take a break click on pause.',
      cssClass: 'myAlert',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            //console.log('Disagree clicked');


            
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');
            //console.log(this.navCtrl.canGoBack());
            
            this._workoutprofile();

          }
        }
      ]
    });
    confirm.present();
  }




// Hide and show tabs and navigationbar
// Make improvments because this is a ugly hack!
// There will be a directive
ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }
//----------------------------------------------------------




// Set the excercises on the screen
  setExercises(data, workout){

    let exercisesObject = this.extend(data, workout);
    console.log(exercisesObject);
    this.exercises = exercisesObject;

  }

// Merge  properties from one object to another
  merge(src, data) {

    for(var prop in data){

     src[prop] = data[prop];
    }

    return src;
  };

// Compare objects and create combined object
  extend(obj, src) {

    let combinedObject = [];
    let nullCounter = 0;

    for (var i = 0 ; i < src.length; i++) {
    
      if(src[i]['id'] == null) {
        combinedObject.push(src[i]);
        nullCounter++;
      }
      else{       
        var mergerObject = this.merge(src[i], obj[(i - nullCounter)]);
        combinedObject.push(mergerObject);    
      }
      
    }
       
    return combinedObject;
}



// puch back if we cancel program
  _workoutprofile(){

         this.navCtrl.pop();

  }


// Starting the timer
 startTimer(){
   this.theTimer = setInterval( () => this.timer() , 1000);
 }
// The counting of secound minits and houres
 timer(){

    this.sec++;

    if(this.sec == 10){
      this.zero1 = "";
    }

    if(this.sec == 60){
      this.min++;
      this.sec = 0;
      this.zero1 = "0";
    }

    if(this.min == 10){
      this.zero2 = "";
    }

    if(this.min == 60){
      this.h++;
      this.min = 0;
      this.zero2 = "0";
    }

    if(this.h == 10){
      this.zero3 = "";
    }


  }


  // check for timer if the training is true
  isTrainingStarted(){
    if(this.trainingHasStarted == true){
      return true;  
    }
    else{
      return false;
    }
  }


  // For coding
  nextExerInTraining(i){
    this.currentExercise = this.exercises[i];
  }
  // For visability
  // Next excercise in program, can choose nr i, work only before you start training
  nextExer(i){
    if(this.trainingHasStarted == false){
      this.currentExercise = this.exercises[i];
      
      
    }
  }


done(){
  let confirm = this.alertCtrl.create({
      title: 'You are done',
      message:  'Good joob wisches your coach, hope to see you soon again',
      cssClass: 'myAlert',
      buttons: [
        {
          text: 'Bye',
          handler: () => {

            this._workoutprofile();

          }
        }
      ]
    });
    confirm.present();
}


next(){

    this.hideNext();

    if(this.trainingHasStarted == true){

      this.nr++;
      if(this.nr < this.exercises.length){
        this.nextExerInTraining(this.nr);
        console.log(this.currentExercise);
        if(this.nr <= this.exercises.length - 2 ){
          setTimeout( () => this.showNext() , this.time);
        }
      }

      if(this.nr == this.exercises.length - 1 ){
        setTimeout( () => this.showDone() , this.time);
      }
      
    }
    
    

  }
  showDone(){
    let done = document.querySelector(".done");
    done["style"].display = "flex";
  }
  showNext(){
    let nextEx = document.querySelector(".next");
    nextEx["style"].display = "flex";
  }
  hideNext(){
    let nextEx = document.querySelector(".next");
    nextEx["style"].display = "none";
  }



}




















