import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,OnDestroy, HostListener } from '@angular/core';
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

    this.connectionMessage = this.chatService.getMessages().subscribe(message => {
      if(this.currentUserData && message['receiverId'] == this.currentUserData.userId && message['senderId']==this.otherUserData.userId )
      {
        this.messages.push(message);
      }
      else
      {
        //send notification
      }
    });
    this.connectionUsers = this.userService.getUsersExceptCurrent().subscribe(data => {
      this.usersList = data;
      if(!this.otherUserData){
        this.otherUserData = data[0];
      }
    });

  }
  ngOnInit(){
    console.log(this.usersList)
    // if(this.usersList.length > 0 ){
    //   //this.otherUserData = this.usersList[0];
    //   console.log(this.usersList);
    // }
    //to emit user to socket io
    this.userService.sendUserToSocket();
  }

//To send message to soket io and DB
  sendMessage() {
    this.chatService.sendMessageToSocket(this.newMessage,this.otherUserData.userId);
    let message ={senderId:this.currentUserData.userId,receiverId:this.otherUserData.userId,text:this.newMessage};
    this.chatService.storeMessageToDB(message).then(response=>{
      this.messages.push(message);
      this.newMessage = '';

    }, (err) => {
      console.log(err);
    });

  }





  getChatMessages(user) {
    this.otherUserData = user;


    this.chatService.getChatMessages(user.userId).then(response=>{
      console.log(response);
      this.messages = response;

    }, (err) => {
      console.log(err);
    });

  }
    //
    // public beforeunloadHandler() {
    //   this.chatService.exitSession();
    //  }
    ngOnDestroy() {
     // this.chatService.exitSession();
      // this.connectionMessage.unsubscribe();
      // this.connectionUsers.unsubscribe();
    }
    public beforeunloadHandler() {
      this.chatService.exitSession();
  }


}

// import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
// import { ChatService } from '../chat.service';
// import * as io from "socket.io-client";

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })

// export class ChatComponent implements OnInit, AfterViewChecked {

//   @ViewChild('scrollMe') private myScrollContainer: ElementRef;

//   chats: any;
//   joinned: boolean = false;
//   newUser = { nickname: '', room: '' };
//   msgData = { room: '', nickname: '', message: '' };
//   socket = io('http://localhost:4000');

//   constructor(private chatService: ChatService) {}

//   ngOnInit() {
//     var user = JSON.parse(localStorage.getItem("user"));
//     if(user!==null) {
//       this.getChatByRoom(user.room);
//       this.msgData = { room: user.room, nickname: user.nickname, message: '' }
//       this.joinned = true;
//       this.scrollToBottom();
//     }
//     this.socket.on('new-message', function (data) {
//       if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
//         this.chats.push(data.message);
//         this.msgData = { room: user.room, nickname: user.nickname, message: '' }
//         this.scrollToBottom();
//       }
//     }.bind(this));
//   }

//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }

//   scrollToBottom(): void {
//     try {
//       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
//     } catch(err) { }
//   }

//   getChatByRoom(room) {
//     this.chatService.getChatByRoom(room).then((res) => {
//       this.chats = res;
//     }, (err) => {
//       console.log(err);
//     });
//   }

//   joinRoom() {
//     var date = new Date();
//     localStorage.setItem("user", JSON.stringify(this.newUser));
//     this.getChatByRoom(this.newUser.room);
//     this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
//     this.joinned = true;
//     this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
//   }

//   sendMessage() {
//     this.chatService.saveChat(this.msgData).then((result) => {
//       this.socket.emit('save-message', result);
//     }, (err) => {
//       console.log(err);
//     });
//   }

//   logout() {
//     var date = new Date();
//     var user = JSON.parse(localStorage.getItem("user"));
//     this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
//     localStorage.removeItem("user");
//     this.joinned = false;
//   }

// }
