import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentListComponent } from './components/admin-student-list/admin-student-list.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { TeacherViewComponent } from './components/teacher-view/teacher-view.component';

const routes: Routes = [
  /* Redirecting the user to the home page if the user enters the root of the application. */
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  /* Telling the router to load the UserListComponent when the user navigates to the home page. */
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: AdminViewComponent },
  { path: 'students', component: AdminStudentListComponent },
  { path: 'teacher/:teacherId', component: TeacherViewComponent },
  /* This is a wildcard route. It will match any route that is not defined in the application. */
   { path: '**', component: Error404Component }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
