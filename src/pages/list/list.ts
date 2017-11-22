import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from './../../model/team';
import { HttpProvider } from './../../providers/http/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  correct:number;
  wrong:number;
  teams:Team[];
  sortedTeams:Team[];



  constructor(public httpProvider: HttpProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.httpProvider.getScores().subscribe(res=>{
      this.teams = res.json();
      console.log(res);
    })
  }

  filterData(teams){

  }

  //Set ion Input to read-only
  isReadonly() {
  return true;
  }

}
