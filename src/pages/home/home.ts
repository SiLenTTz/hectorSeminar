import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from './../../model/team';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { NgZone } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Answer Text Placeholder
  a1: string = "answer Nr.1";
  a2: string = "answer Nr.2";
  a3: string = "answer Nr.3";

  //Your Score
  points: number = 0;
  userId: number;
  questionId: number;
  qText: string = "questionTemplate";
  //To show or hide Question text
  qReady: boolean = false;

  //Your found Beacons
  foundRegions: any[] = [];

  //Your answer objects referenced by the view
  data = {
      answer0: { "found": false, "checked": false, "content": { "aid": 0, "answer": "" } },
      answer1: { "found": false, "checked": false, "content": { "aid": 1, "answer": "" } },
      answer2: { "found": false, "checked": false, "content": { "aid": 2, "answer": "" } },
  };

  //Your Beacons, see docu
  regions = [
    // TODO insert beacon objects
  ]

  constructor(private zone: NgZone, private alertCtrl: AlertController, public navParams: NavParams, public http: Http, public navCtrl: NavController) {
    this.userId = this.navParams.get("uid");
    // TODO complete ibeacon initialization
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  startMonitoringForAllRegions() {
    // TODO insert code
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  handleBeaconDiscovered(region) {

    this.zone.run(() => {
      console.log("found beacon");
      console.log(region);
        // 1st found beacon => question
      if (this.foundRegions.length == 0) {
        // TODO insert code
      } else {
        // 2nd - 4th found beacon => answers
        // TODO insert code
        }
      });
  }


  getAnswer() {
    // TODO insert HTTP request
  }

  getQuestion(){
    // TODO insert HTTP request
  }

  proofResult() {
    this.zone.run(() => {
      // TODO insert HTTP request
    });
  }

  setScore(points) {
    this.points =  this.points+points;
  }

  showHighscore(){
    // TODO insert code to navigate to highscore page
  }

  // resetting question
  resetQuestion() {
    this.qReady = false;
  }

  // resetting answers
  resetAnswers() {
    for (var answer in this.data) {
      this.data[answer].found = false;
      this.data[answer].checked = false;
    }
  }
}
