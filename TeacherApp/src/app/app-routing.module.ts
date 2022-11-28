import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { AdminStudentListComponent } from './components/admin-student-list/admin-student-list.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { RatingFormComponent } from './components/rating-form/rating-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentFormComponent } from './components/register/student-form/student-form.component';
import { TeacherFormComponent } from './components/register/teacher-form/teacher-form.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { AdminTeacherListComponent } from './components/admin-teacher-list/admin-teacher-list.component';
import { TeacherViewComponent } from './components/teacher-view/teacher-view.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  /* Redirecting the user to the home page if the user enters the root of the application. */
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  /* Telling the router to load the UserListComponent when the user navigates to the home page. */
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'registro', component: RegisterComponent, children: [
      { path: 'estudiante', component: StudentFormComponent },
      { path: 'profesor', component: TeacherFormComponent }
    ]
  },
  { path: 'valorar/:teacherId', component: RatingFormComponent },
  { path: 'actualizar/estudiante/:studentId', component:StudentFormComponent},
  { path: 'actualizar/profesor/:teacherId', component:TeacherFormComponent},
  //{ path: 'admin-estudiantes', component: AdminStudentListComponent },
  //{ path: 'admin-profesores', component: AdminTeacherListComponent },
  { path: 'profesores', component: TeacherListComponent },
  //{ path: 'profile-student', component: StudentViewComponent, canActivate: [LoginGuard] },
  //{ path: 'profile-teacher/:teacherId', component: TeacherViewComponent },
  //{ path: 'profile-admin', component: AdminViewComponent },
  // TODO - Vista pública del perfil de profesor
  { path: 'profesor/:teacherId', component: TeacherViewComponent },
  { path: 'estudiante/:studentId', component: StudentViewComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [LoginGuard] },
  /* This is a wildcard route. It will match any route that is not defined in the application. */
  { path: '**', component: Error404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
