import {Component, ViewEncapsulation} from '@angular/core';
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
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
  public trainingHasPaused: boolean = false;
  public nr: any = 0;
  public theTimer: any;
  public sec: any = 0;
  public min: any = 0;
  public h: any = 0;
  public zero1: string = "0";
  public zero2: string = "0";
  public zero3: string = "0";
  public tbe: number;


  public exercises = [];
  public currentExercise = {Name: "Excersise", Description: "Description", reps: "Reps", sort: "undefined"};

  constructor(private navCtrl: NavController, params:NavParams, private request: Request, 
              global: Global, public alertCtrl: AlertController, private viewCtrl: ViewController,
              private toastCtrl: ToastController) {

      
      this.tbe = params.get("TimeBetweenExcercise")
      let workout = params.get("Workout")

      // Consol-log time between ex
      console.log(this.tbe);


      let ExerciseArray = [];
      let exObjArray = []

      for(let exercise in workout.Exercises){

        let exObj = JSON.parse(workout.Exercises[exercise]);
        exObjArray.push(exObj)

        if(exObj.id != null) ExerciseArray.push(exObj.id); 
       
      }

        
      this.request.getWrkExercises(ExerciseArray).subscribe(
            data => this.setExercises(data, exObjArray)
      );

  }
 





 
  startTraining(){

    // start training boolean
    this.trainingHasStarted = true;

    // so we can't go back in a traing session
    this.viewCtrl.showBackButton(false);
    // hide and show fab buttons
    this.showInTraining();
    this.hideStartTraining();

    
    setTimeout( () => this.showNext() , this.time);
    
    
    // start timer
    this.startTimer();
    
    // start all excersises
    this.nr = 0;
    this.nextExerInTraining(this.nr);
  }



  stopTraining(){

    this.endTraining();
    this.nr = 0;


  }

  pauseTraining(fab){

    fab.close();
    clearTimeout(this.theTimer);

    // Fab buttons change state
    this.showStartTraining();
    this.hideInTraining();

    this.trainingHasPaused = true;

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
          text: 'No',
          handler: () => {
            //console.log('No clicked');


            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Yes clicked');
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

    // Check sort
    this.checkSort(exercisesObject);

    this.exercises = exercisesObject;
  }

  checkSort(obj){
    for(let i = 0; i < obj.length; i++){
      console.log(obj[i]['sort']);
      if(obj[i]['sort'] == "1"){
        obj[i]['sort'] = "reps";
      }
      if(obj[i]['sort'] == "2"){
        obj[i]['sort'] = "time";
      }
    }
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
// The counting of secound minutes and houres
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

// Next excersice, must schek if it's the last excersice
// Use to go on in program
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
        // Can't pause or stop when training is done
        this.hideInTraining();
      }
      
    }
    
    

  }

  // Show or hide buttons (FAB)
  // May come a different way
  // TODO: sheck for updates
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
  hideInTraining(){
    let inTraining = document.querySelector(".inTraining");
    inTraining["style"].display = "none";
  }
  showInTraining(){
    let inTraining = document.querySelector(".inTraining");
    inTraining["style"].display = "flex";
  }
  hideStartTraining(){
    let start = document.querySelector(".start");
    start["style"].display = "none";
  }
  showStartTraining(){
    let start = document.querySelector(".start");
    start["style"].display = "flex";
  }



}




















