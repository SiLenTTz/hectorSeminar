import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class HttpProvider {

  //Server IP
  webservice: any = "http://ec2-18-220-213-191.us-east-2.compute.amazonaws.com:8080";
  status:any;
  statusText:any;
  token:any;

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');

  }


  //send Answer
  //Post
  proof(userId, questionId, answerId) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers});

      return this.http.get(this.webservice+"/proof/"+userId+"/"+questionId+"/"+answerId, options);

    }

    //Get User Id
    getUserId(username) {
    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.webservice+"/userid/"+username, options);
  }

    //Get Scores
    //id:
    getScores() {
    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.webservice+"/score", options);
  }

    //Get Question
    //id:.....
    getQuestion(uid) {
    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.webservice+"/question/"+uid, options);

  }

    //Get Answer
    //id:.... asnwers comes back
    getAnswer(userId,questionId) {
    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.webservice+"/answer/"+userId+"/"+questionId, options);

  }
}
