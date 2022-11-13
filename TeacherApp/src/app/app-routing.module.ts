import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegistroComponent } from './components/student-registro/student-registro.component'

const routes: Routes = [
  { path:'registro/alumno', component: StudentRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
