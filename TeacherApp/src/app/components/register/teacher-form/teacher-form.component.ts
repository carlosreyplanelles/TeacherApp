import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {LocationsService } from 'src/app/services/locations.service';
import { Branch } from 'src/app/interfaces/branch.interface';
import { BranchesService } from 'src/app/services/branches.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  
  teacherForm:FormGroup;
  teacher_role_id = 2
  provinces: Province[] = [];
  cities: City[] = [];
  citiesbyProvince: City[] = [];
  province_id!:string;
  branches:Branch[] = []
  storedTeacher:any
  accion:string = "Registrar"
  timeStampList:any[]=[]
  userLat: number | undefined = undefined
  userLon: number | undefined = undefined
  msgErrorLoad: string = "";

  constructor( 
    private locationsService: LocationsService,
    private branchesService: BranchesService,
    private usersService: UsersService,
    private activatedRoute:ActivatedRoute,
    private teachersService: TeachersService,
    private router: Router) { 
    this.teacherForm  = new FormGroup({
      role_id: new FormControl(this.teacher_role_id,[]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      surname: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordConfirm: new FormControl('',[
        Validators.required
      ]),
      address: new FormControl('',[]),
      phone: new FormControl('',[Validators.required,
        Validators.pattern(/^[+][0-9]+$/),
        Validators.maxLength(13),
        Validators.minLength(11)]),
      city_id: new FormControl('',[Validators.required]),
      province_id: new FormControl('',[Validators.required]),
      avatar: new FormControl('',[]),
      price_hour: new FormControl('',[Validators.required]),
      branch_id: new FormControl('',[Validators.required]),
      experience: new FormControl('',[Validators.pattern(/^[0-9]+$/), Validators.maxLength(2)]),
      subjects: new FormControl('',[]),
      validated: new FormControl(0,[Validators.required]),
      start_class_hour: new FormControl(0,[Validators.required]),
      end_class_hour: new FormControl(0,[Validators.required]),
    }, [this.checkPassword, this.scheduleTimesCheck]);
  }
  
  async ngOnInit(): Promise<void> { 
   
    try {

      this.provinces =  await this.locationsService.getAllProvince();
      this.cities = await this.locationsService.getAllCities();
      this.branches = await this.branchesService.getAll();

      this.createTimeStamps();

      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.userLat = latitude,
        this.userLon = longitude
      })
  
      this.activatedRoute.params.subscribe(async (params: any) => {
        if (params.teacherId) {
          this.accion = "Actualizar"
          this.storedTeacher = await this.teachersService.getById(params.teacherId);
          this.citiesbyProvince = this.cities.filter(c => c.province_id == parseInt(this.storedTeacher.province_id));

          this.teacherForm.patchValue({
            name: this.storedTeacher.name,
            surname: this.storedTeacher.surname,
            email: this.storedTeacher.email,
            address: this.storedTeacher.address,
            avatar: this.storedTeacher.avatar,
            phone: this.storedTeacher.phone,
            city_id: this.storedTeacher.city_id,
            province_id: this.storedTeacher.province_id,
            subjects: this.storedTeacher.subjects,
            branch_id : this.storedTeacher.branch_id,
            experience : this.storedTeacher.experience,
            price_hour : this.storedTeacher.price_hour,
            start_class_hour: this.storedTeacher.start_class_hour,
            end_class_hour: this.storedTeacher.end_class_hour
          });
        }
      });
    } 
    catch(error: any) {   
      this.msgErrorLoad += error.error['fatal'];         
      Swal.fire({
        icon: 'error',
        title: '\'' + error.status + ' -' + error.statusText + '\' Error al cargar el formulario',
        html: `<div style="text-align: left;">
                <p>Ha ocurrido un error, inténtelo de nuevo más tarde</p>
                <p>Detalles: ${this.msgErrorLoad}</p>
              </div>`
      });
      this.router.navigate(['/landing-page']);
    }
      
  }

  createTimeStamps(){

    for(let i = 0; i <24;i++){
      const timeStamp={
        value:i,
        hour:i+':00'
      }
      this.timeStampList.push(timeStamp)
    }
  }

  onSelected(e:any){
    try{
      this.citiesbyProvince = this.cities.filter(c => c.province_id == parseInt(e.target.value))
    } catch(error){
      console.log (`FATAL : ${{error}}`)
    }
  }

  async getDataForm() {
    if (this.teacherForm.status === "VALID") {
      this.activatedRoute.params.subscribe(async (params: any) => {

          const user = await this.usersService.findByEmail(this.teacherForm.value.email)
         
          let response: any;
          let teacher = this.teacherForm.value         
          
          if (!params.teacherId) {
            if (user != null) {
              alert("Error al registrar el usuario. El correo utilizado ya existe.")
            } 
            else {
              
              if (this.userLat != undefined) {
                teacher.latitude = this.userLat
                teacher.longitude = this.userLon
              }

              try {

                response = await this.teachersService.create(teacher);
                
                if (response.teacher_id) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El usuario se ha registrado correctamente.',
                    showConfirmButton: false,
                    timer: 1800
                  })
                  this.router.navigate(['/login']);
                }
              }
              catch (error: any) {                
                let msgErrorForm: string = "";
                if (error.error!== undefined) {
                  for(var json in error.error){
                    if (error.error[json].msg!== undefined) {
                      msgErrorForm+= "<p> * " + error.error[json].msg + "</p>";
                    }
                    else {
                      msgErrorForm+= "<p> Error general en TeacherApp: " + error.error[json] + ". Contacte con el administrador de la aplicación</p>";
                    }
                  }  
                }
                else {
                  msgErrorForm += 'Ha ocurrido un error inténtelo de nuevo más tarde';
                }

                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '\'' + error.status + ' -' + error.statusText + '\' Error al registrarse en TeacherApp',
                  html: `<div style="text-align: left;">${msgErrorForm}</div>`
                });
              }
            }
          } 
          else {
              this.storedTeacher.name = teacher.name,
              this.storedTeacher.surname = teacher.surname,
              this.storedTeacher.email = teacher.email,
              this.storedTeacher.password = teacher.password,
              this.storedTeacher.address = teacher.address,
              this.storedTeacher.avatar = teacher.avatar,
              this.storedTeacher.phone = teacher.phone,
              this.storedTeacher.city_id = teacher.city_id,
              this.storedTeacher.province_id = teacher.province_id,
              this.storedTeacher.subjects = teacher.subjects,
              this.storedTeacher.branch_id = teacher.branch_id,
              this.storedTeacher.experience = teacher.experience,
              this.storedTeacher.price_hour = teacher.price_hour,
              this.storedTeacher.role_id = this.teacher_role_id,
              this.storedTeacher.start_class_hour = teacher.start_class_hour,
              this.storedTeacher.end_class_hour = teacher.end_class_hour

              if (this.userLat != undefined) {
                this.storedTeacher.latitude = this.userLat
                this.storedTeacher.longitude = this.userLon
              }
              try {
                const response = await this.teachersService.update(this.storedTeacher);
                
                if (response.affectedRows === 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Se han actualizado los datos satisfactoriamente.',
                    showConfirmButton: false,
                    timer: 1800
                  });
                  this.router.navigate(['/perfil']);
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error, revise los datos e inténtelo de nuevo.',
                    showConfirmButton: false,
                    timer: 1800
                  });
                }
              } 
              catch (error: any) {                
                let msgErrorForm: string = "";
                if (error.error!== undefined) {
                  for(var json in error.error){
                    if (error.error[json].msg!== undefined) {
                      msgErrorForm+= "<p> * " + error.error[json].msg + "</p>";
                    }
                    else {
                      msgErrorForm+= "<p> Error general en TeacherApp: " + error.error[json] + ". Contacte con el administrador de la aplicación</p>";
                    }
                  }  
                }
                else {
                  msgErrorForm += 'Ha ocurrido un error inténtelo de nuevo más tarde';
                }
                Swal.fire({
                  icon: 'error',
                  title: '\'' + error.status + ' -' + error.statusText + '\' Error al actualizar los datos en TeacherApp',                  
                  html: `<div style="text-align: left;">${msgErrorForm}</div>`                  
                })
              }
          }
        
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error del formulario',
        text: 'Los datos introducidos son incorrectos. Por favor, revise la información introducida.',
      })
    }
  }

  checkControl(controlName: string, Error: string): boolean{
    let noErrors = false;
    if (this.teacherForm.get(controlName)?.hasError(Error) && this.teacherForm.get(controlName)?.touched) {
      noErrors = true;
    }
    return noErrors;
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.teacherForm.get(controlName)?.status==="INVALID" && this.teacherForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value;
    const passwordConfirm: string = pFormValue.get('passwordConfirm')?.value;
    if (password !== passwordConfirm) {
      return { 'checkpassword': true }
    }
      return null
  }

  scheduleTimesCheck(pFormValue: AbstractControl){
    const start_class_hour = parseInt(pFormValue.get('start_class_hour')?.value)
    const end_class_hour = parseInt(pFormValue.get('end_class_hour')?.value)
    if (start_class_hour >= end_class_hour){
      return { 'scheduleCheck': true }
    }
    return null
  }
}

