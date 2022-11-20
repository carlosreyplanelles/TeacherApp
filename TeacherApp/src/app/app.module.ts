import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { environment } from 'src/environments/environment';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminStudentListComponent } from './components/admin-student-list/admin-student-list.component';
import { TeacherViewComponent } from './components/teacher-view/teacher-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentViewComponent,
    Error404Component,
    AdminViewComponent,
    AdminStudentListComponent,
    TeacherViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /* Importing the google maps api key from the environment.ts file. */
    AgmCoreModule.forRoot(environment.googleMaps),
    BrowserAnimationsModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
