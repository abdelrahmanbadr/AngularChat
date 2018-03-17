import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }
  userName="";


  ngOnInit() {
  }
  submitUser () {
    let data ={userName:this.userName};
    this.userService.saveUser(data).then(response=>{

      let userData= {userName:this.userName,userId:response['insertId'] }
      localStorage.setItem('userData',JSON.stringify(userData));
      location.reload();
    }, (err) => {
      console.log(err);
    });
  }


}
