import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,private userService: UserService) { }
  userName;
  avatar="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg";
  password;
  email;
  signup=false;
  login=true;


  ngOnInit() {
  }
  setAvatar(ev){
   this.avatar = ev.target.src;
  }
  toggle(){
    this.signup = !this.signup;
    this.login = !this.login;

  }

  signUp () {
    if(!this.userName || !this.password || !this.userName){
      this.toastr.error('Please Fill All Data');
      return;
    }
     let data ={userName:this.userName,password:this.password,avatar:this.avatar,email:this.email};

    this.userService.saveUser(data).then(response=>{
      if(response == "failed"){
        this.toastr.error('Please choose  another email');
        return;
      }

      let userData= {userName:this.userName,userId:response['insertId'],avatar:this.avatar }
      localStorage.setItem('userData',JSON.stringify(userData));
      location.reload();
    }, (err) => {
      console.log(err);
    });
  }
  loginUser () {
    if(!this.email || !this.password ){
      this.toastr.error('Please Fill All Data');
      return;
    }
     let data ={password:this.password,email:this.email};
    console.log(data);
    this.userService.login(data).then(response=>{

      if(response == "login failed"){
        this.toastr.error('Please try again with right credentials');
        return;
      }else{
        let userData= {userName:response['userName'],userId:response['id'],avatar:response['avatar']}
        console.log(userData);
        localStorage.setItem('userData',JSON.stringify(userData));
        location.reload();
      }

    }, (err) => {
      console.log(err);
    });
  }


}
