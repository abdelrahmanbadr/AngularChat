import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
//  userLoggedIn = localStorage.getItem('userData');
  usersList = ['name 1','name 2'];

}
