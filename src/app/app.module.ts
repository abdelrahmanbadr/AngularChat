import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    MomentModule,
    FormsModule,
    HttpClientModule,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
