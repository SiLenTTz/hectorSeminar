import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class HttpProvider {

  //Server IP
  webservice: any = "http://ec2-18-220-213-191.us-east-2.compute.amazonaws.com:8080";
  status: any;
  statusText: any;
  token: any;

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');

  }


  //send Answer
  //Post
  proof(userId, questionId, answerId) {
    // TODO insert HTTP request
  }

  //Get User Id
  getUserId(username) {
    // TODO insert HTTP request
  }

  //Get Scores
  //id:
  getScores() {
    // TODO insert HTTP request
  }

  //Get Question
  //id:.....
  getQuestion(uid) {

    // TODO insert HTTP request
  }

  //Get Answer
  //id:.... asnwers comes back
  getAnswer(userId, questionId) {
    // TODO insert HTTP request
  }
}
