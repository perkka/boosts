import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Request} from '../../services/request';
import {CoachPage} from '../coach/coach';

@Component({
  selector: 'category-page',
  templateUrl: 'category.html'
})
export class CategoryPage {

  private Request : Request;
  public coaches = null;
  public categoryName:string;
  public categoryId:number;

  constructor(private navCtrl: NavController, request: Request, params: NavParams) {

    this.categoryName = params.get("categoryName");
    this.categoryId = params.get("categoryId");

    this.Request = request;
    this.getCoaches();
  }

  getCoaches(){

      this.Request.getCoaches(this.categoryId).subscribe(
            data => this.coaches = data
        );
      
  }

  _coach(coachData){

       this.navCtrl.push(CoachPage,{
            coachData: coachData,
          });

  }



}
