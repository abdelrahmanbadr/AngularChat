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





@NgModule({
  declarations: [
    AppComponent,

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
    NgbModule.forRoot(),

  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
