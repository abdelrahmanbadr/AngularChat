import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,OnDestroy, HostListener, EventEmitter } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @HostListener('window:beforeunload')
  onExit() {
    this.chatService.exitSession();
  }
  messages ;
  usersList ;
  newMessage = "";
  currentUserData;
  otherUserData;
  unSeenMessage=[]

  date =  new Date();


  constructor(private chatService: ChatService,private userService: UserService) {

    this.currentUserData = JSON.parse(localStorage.getItem('userData'));
    this.usersList=[{userName:"Silly Bot",userId:-1,avatar:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"}];


    this.userService.getUsersExceptCurrent().subscribe(data => {
      this.usersList = data;
      this.usersList.push({userName:"Silly Bot",userId:-1,avatar:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg"});
      if(!this.otherUserData){
        this.otherUserData = data[0];
      }
    });
    this.chatService.getMessages().subscribe(message => {
      if(message['receiverId'] == this.currentUserData.userId && message['senderId'] != this.otherUserData.userId && message['senderId'] != this.currentUserData.userId)
      {
        if(!this.unSeenMessage[message['senderId']]){
          this.unSeenMessage[message['senderId']]=0;
        }
       this.unSeenMessage[message['senderId']]+=1;

      }
    });

  }
  ngOnInit() {
    this.userService.sendUserToSocket();
  }
  getUserData(user){
    this.otherUserData = user;
    console.log(user);
    this.unSeenMessage[user.userId]=0;

  }

//To send message to soket io and DB






}
