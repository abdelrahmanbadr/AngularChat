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

  chats: any;
  joinned: boolean = false;
  messages ;
  usersList ;
  newMessage = "";
  currentUserData;
  otherUserData;
  ////////////////////////
  //messages = [];

  connectionMessage;
  connectionUsers;
  backconnect;
  message;
  username;
  userInput;
  users;




  date =  new Date();


  constructor(private chatService: ChatService,private userService: UserService) {

    this.currentUserData = JSON.parse(localStorage.getItem('userData'));


    this.connectionUsers = this.userService.getUsersExceptCurrent().subscribe(data => {
      this.usersList = data;
      if(!this.otherUserData){
        this.otherUserData = data[0];
      }
    });

  }
  ngOnInit() {
    this.userService.sendUserToSocket();
  }
  getUserData(user){
    this.otherUserData = user;
    console.log(this.otherUserData);
  }

//To send message to soket io and DB






}
