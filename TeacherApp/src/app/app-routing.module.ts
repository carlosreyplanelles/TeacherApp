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
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  /* Redirecting the user to the home page if the user enters the root of the application. */
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  /* Telling the router to load the UserListComponent when the user navigates to the home page. */
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'register', component: RegisterComponent, children: [
      { path: 'estudiante', component: StudentFormComponent },
      { path: 'profesor', component: TeacherFormComponent }
    ]
  },
  { path: 'actualizar/estudiante/:studentId', component: StudentFormComponent },
  { path: 'teachers', component: TeacherListComponent },
  { path: 'rating/:teacherId', component: RatingFormComponent },
  { path: 'profile-student', component: StudentViewComponent, canActivate: [LoginGuard] },
  { path: 'profile-teacher/:teacherId', component: TeacherViewComponent },
  { path: 'profile-admin', component: AdminViewComponent },
  { path: 'admin-teachers', component: AdminTeacherListComponent },
  { path: 'admin-students', component: AdminStudentListComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [LoginGuard] },
  /* This is a wildcard route. It will match any route that is not defined in the application. */
  { path: '**', component: Error404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
