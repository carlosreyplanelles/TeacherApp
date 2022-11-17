import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { AdminStudentListComponent } from './components/admin-student-list/admin-student-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminViewComponent,
    Error404Component,
    Error500Component,
    AdminStudentListComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    /* A module that is used to make HTTP requests. */
    HttpClientModule,
    /* A module that is used to create forms. */
    ReactiveFormsModule,
    /* A module that is used to create forms. */
    FormsModule,
    /* Importing the google maps api key from the environment.ts file. */
    AgmCoreModule.forRoot(environment.googleMaps),
    BrowserAnimationsModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
