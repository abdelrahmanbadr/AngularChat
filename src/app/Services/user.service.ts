import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
  protected socket;
  protected apiUrl;
  protected currentUserData;


  constructor(private http: HttpClient) {
    this.currentUserData = JSON.parse(localStorage.getItem('userData'));
    this.apiUrl = environment.apiUrl;
  }

  // getUsersExceptCurrent() {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.apiUrl+'users/'+this.currentUserData.userId)
  //     //  .map(res => res.json())
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  sendUserToSocket() {
    this.socket.emit('saveUserData',this.currentUserData.userName,this.currentUserData.userId);
  }
  getUsersExceptCurrent() {
    let observable = new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('users', (data) => {
        //let clients = [];
        data.users.forEach((element,index) => {
          if(element.userId == this.currentUserData.userId)
              data.users.splice(index, 1);
        });

       observer.next(data.users);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  saveUser(data) {
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'users', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
