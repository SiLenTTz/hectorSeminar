import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from './../../providers/http/http';
import { Team } from './../../model/team';
import { Http, Headers, RequestOptions } from '@angular/http';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { AlertController } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { IBeacon } from '@ionic-native/ibeacon';
import { ListPage } from './../../pages/list/list';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  a1: string = "answer Nr.1";
  a2: string = "answer Nr.2";
  a3: string = "answer Nr.3";

  points: number = 0;

  userId: number;
  qReady: boolean = false;
  foundRegions: any[] = [];
  questionId: number;
  qText: string = "Die ";
  data = {
    answer0: { "found": false, "checked": false,  "aid": 0  },
    answer1: { "found": false, "checked": false,  "aid": 1 },
    answer2: { "found": false, "checked": false,  "aid": 2 }
  };
  regions = [
    this.ibeacon.BeaconRegion('beacon1', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 1, 1),
    this.ibeacon.BeaconRegion('beacon2', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 2, 1),
    this.ibeacon.BeaconRegion('beacon3', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 3, 1),
    this.ibeacon.BeaconRegion('beacon4', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 4, 1)
  ]
  constructor(private ibeacon: IBeacon, private zone: NgZone, private alertCtrl: AlertController, public navParams: NavParams, public http: Http, public navCtrl: NavController, public httpProvider: HttpProvider, private estimote: EstimoteBeacons) {
    this.userId = this.navParams.get("uid");

    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
      data => { console.log('didRangeBeaconsInRegion: ', data) },
      error => { console.error() }
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
      data => { console.log('didStartMonitoringForRegion: ', data) },
      error => { console.error() }
      );
    delegate.didEnterRegion()
      .subscribe(
      data => {
        console.log('didEnterRegion: ', data);
        this.handleBeaconDiscovered(data);
      }
      );
    delegate.didExitRegion()
      .subscribe(
      data => {
        console.log('didExitRegion: ', data);
      }
      );
    this.startMonitoringForAllRegions();

    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  startMonitoringForAllRegions() {
    for (var region of this.regions) {
      console.log(region);
      this.ibeacon.startMonitoringForRegion(region)
        .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
        );
    }

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
    // 1st found beacon
    this.zone.run(() => {
      console.log("found beacon");
      console.log(region);
      if (this.foundRegions.length == 0) {
        this.foundRegions.push(region.region);
        this.getQuestion();
      } else {
        // 2nd - 4th found beacon
        var beaconAlreadyFound = false;
        console.log("checking if beacon was found already", region);
        for (var i = 0; i < this.foundRegions.length; i++) {
          var foundRegion = this.foundRegions[i];
          console.log("found region " + (i + 1) + ": ", foundRegion);
          if (foundRegion.uuid == region.region.uuid && foundRegion.major == region.region.major && foundRegion.minor == region.region.minor) {
            console.log("beacon already found");
            beaconAlreadyFound = true;
            break;
          }
        }
        if (!beaconAlreadyFound) {
          console.log(region);
          console.log("found a new answer beacon");
          this.foundRegions.push(region.region);
          console.log("founds regions: ", this.foundRegions);
        this.getAnswer();
        }
      }
      //this.ibeacon.stopMonitoringForRegion(region);
      //this.estimote.stopRangingBeaconsInRegion(region.region);
    });
  }

  //Set ion Input to read-only
  isReadonly() {
    return true;
  }



  getAnswer() {
    this.httpProvider.getAnswer(this.userId, this.questionId).subscribe(response => {
      console.log(response);
      var answerId = parseInt(response.json()["aid"]);
      if (answerId != null && answerId != undefined) {
        switch (answerId) {
          case 0:
            console.log("setting variables for answer0");
            this.data.answer0.found = true;
            this.a1 = response.json()["answer"];
            break;
          case 1:
            console.log("setting variables for answer1");
            this.data.answer1.found = true;
            this.a2 = response.json()["answer"];
            break;
          case 2:
            console.log("setting variables for answer2");
            this.data.answer2.found = true;
            this.a3 = response.json()["answer"];
            break;
          default:
            console.log("setting variables for default");
            break;
        }
      }

    }, error => {
      this.presentAlert(error.json()["message"]);
    })
  }

  getQuestion(){
    this.httpProvider.getQuestion(this.userId).subscribe(response => {
      console.log(response);
      this.qText = response.json()["question"];
      this.questionId = response.json()["qid"];
      this.qReady = true;
      console.log("found a question");
    }, error => {
      this.presentAlert(error.json()["message"]);
    });
  }

  proofResult() {
    this.zone.run(() => {
      for (var answer in this.data) {
        if (this.data[answer].checked) {
          // only check those answers, that have been spotted and are expected to be true.
          this.httpProvider.proof(this.userId, this.questionId, this.data[answer].aid).map(res => res.json()).subscribe(data => {
            console.log("Proof result", data);
            var proof = data.proof;
            var msg = data["result"];
            if (proof == "OK") {
              this.startMonitoringForAllRegions();
              this.setScore(1);
              this.resetQuestion();
              this.resetAnswers();
              this.foundRegions = [];
            } else {
              this.setScore(-1);
            }
            this.presentAlert(msg);
          }, error => {
            this.presentAlert("Error while checkin your answer");
          });;
        }
      }

    });
  }

  setScore(points) {
    // FIXME: Punktestand geht nicht hoch!
    this.points =  this.points+points;
  }

  resetQuestion() {
    this.qReady = false;

  }

  showHighscore(){
      this.navCtrl.push(ListPage);
  }

  resetAnswers() {
    for (var answer in this.data) {
      this.data[answer].found = false;
      this.data[answer].checked = false;
    }
  }
}
