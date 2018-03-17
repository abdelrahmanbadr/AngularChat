import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class ChatService {
  protected apiUrl;
  protected currentUserData;
  protected socket;

  constructor(private http: HttpClient) {
    this.currentUserData = JSON.parse(localStorage.getItem('userData'));
    this.apiUrl = 'http://localhost:3000/';
   }

  getChatMessages(userId2) {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiUrl+'messages/' + this.currentUserData.userId+'/'+userId2)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  //  used to store Chat Message to DB
  storeMessageToDB(data) {

    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'messages', data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  //used to send chat message to soket io
  sendMessageToSocket(text,receiverId) {

    this.socket.emit('add-message', text, this.currentUserData.userId,receiverId,this.currentUserData.userName);
    this.socket.emit('users');
  }


  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }



  exitSession() {
    this.socket.emit('exitSession', this.currentUserData.userId);
  }

}
