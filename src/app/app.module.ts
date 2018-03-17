import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './Services/chat.service';
import { UserService } from './Services/user.service';
import { LoginComponent } from './login/login.component';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { ToastrModule } from 'ngx-toastr';



const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    ChatContentComponent

  ],
  imports: [
    BrowserModule,
    MomentModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatListModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),

  ],


  providers: [ChatService,UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
