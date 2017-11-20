import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from './../../providers/http/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from './../../pages/home/home';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  username: String;
  uid: number;
  constructor(private alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Name already in use',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getName() {

  }
}
