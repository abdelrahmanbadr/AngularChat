import { Component, OnInit, Input, EventEmitter ,ViewContainerRef } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
  @Input()otherUserData
  // set otherUserData(otherUserData) {
  //   this.otherUserData =otherUserData;
  // }
  messages;
  newMessage;
  currentUserData;

  constructor(private toastr: ToastrService,private chatService: ChatService,private userService: UserService) {
   // this.toastr.setRootViewContainerRef(vcr);
    this.currentUserData = JSON.parse(localStorage.getItem('userData'));
    this.chatService.getMessages().subscribe(message => {
      if(this.currentUserData && message['receiverId'] == this.currentUserData.userId && message['senderId']==this.otherUserData.userId )
      {
        this.messages.push(message);
      }
      else if(message['receiverId'] == this.currentUserData.userId && message['senderId'] != this.otherUserData.userId && message['senderId'] != this.currentUserData.userId)
      {
        this.toastr.success(message['text'], message['userName']);
      }
    });

  }

  ngOnInit() {

    this.getChatMessages();
  }
  ngOnChanges(){
    this.getChatMessages();
  }
  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.sendMessage();
    }
  }
  sendMessage() {
    if(!this.newMessage){
      this.toastr.error('Please write a message');
      return;
    }
    let message ={senderId:this.currentUserData.userId,receiverId:this.otherUserData.userId,text:this.newMessage};
    if(this.otherUserData.userId == "-1" ){
      this.messages.push(message);

     let otherMessage = {senderId:-1,text:this.newMessage};;

      this.messages.push(otherMessage);
      this.newMessage ="";
      return;
    }

    this.chatService.sendMessageToSocket(this.newMessage,this.otherUserData.userId);
    this.chatService.storeMessageToDB(message).then(response=>{
      this.messages.push(message);

      this.newMessage = '';

    }, (err) => {
      console.log(err);
    });

  }


  getChatMessages() {

    this.chatService.getChatMessages(this.otherUserData.userId).then(response=>{
      console.log(response);
      this.messages = response;
      this.chatBot();

    }, (err) => {
      console.log(err);
    });

  }
  chatBot() {
    if(this.otherUserData.userId == "-1" && this.messages){
      let x ={senderId:-1,receiverId:this.currentUserData.userId,text:"I will echo whatever you write"};
      this.messages.push(x);

    }
  }

}
