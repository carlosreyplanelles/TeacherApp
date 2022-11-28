import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LocationsService } from 'src/app/services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  studentForm:FormGroup;
  student_role_id = 3
  provinces: Province[] = [];
  cities: City[] = [];
  citiesbyProvince: City[] = []
  accion:string = "Registrar"
  storedStudent: any

  constructor( 
    private locationsService: LocationsService,
    private studentsService: StudentsService,
    private usersService: UsersService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router: Router) { 
    this.studentForm  = new FormGroup({
      role_id: new FormControl(this.student_role_id,[]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
      surname: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/)
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
      province_id: new FormControl('',[Validators.required]),
      city_id: new FormControl('',[Validators.required]),
      avatar: new FormControl('',[])
    }, [this.checkPassword]);
  }
  
  ngOnInit(): void {

    this.getProvinces()
    this.getCities()

    this.activatedRoute.params.subscribe(async (params: any) => {

      if (params.studentId) {
        this.accion = "Actualizar"
        this.storedStudent = await this.studentsService.getById(params.studentId)
        this.citiesbyProvince = this.cities.filter(c => c.province_id == parseInt(this.storedStudent.province_id))

        this.studentForm.patchValue({
          name: this.storedStudent.name,
          surname: this.storedStudent.surname,
          email: this.storedStudent.email,
          password: this.storedStudent.password,
          address: this.storedStudent.address,
          avatar: this.storedStudent.avatar,
          phone: this.storedStudent.phone,
          city_id: this.storedStudent.city_id,
          province_id: this.storedStudent.province_id
        })
      }
    })
  }

  async getProvinces() {
    try{
      this.provinces =  await this.locationsService.getAllProvince()
    } catch(error) {
      console.log (`FATAL : ${{error}}`)
    }
  }

  async getCities(){
    try{
      this.cities = await this.locationsService.getAllCities()
    } catch(error) {
      console.log (`FATAL : ${{error}}`)
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
    if (this.studentForm.status === "VALID") {
      this.activatedRoute.params.subscribe(async (params: any) => {
        const user = await this.usersService.findByEmail(this.studentForm.value.email)
        let response
        let student = this.studentForm.value
        if (!params.studentId) {
          if (user != null) {
            alert("Error al registrar el usuario.El correo utilizado ya existe.")
          } else {
            response = await this.studentsService.create(student)
            if (response.id) {
              alert("El usuario ha sido creado correctamente.")
            } else {
              alert("Ha ocurrido un error intentelo de nuevo más tarde")
            }
          }
        } else{
          this.storedStudent.name = student.name,
          this.storedStudent.surname = student.surname,
          this.storedStudent.email = student.email,
          this.storedStudent.password = student.password,
          this.storedStudent.address = student.address,
          this.storedStudent.avatar = student.avatar,
          this.storedStudent.phone = student.phone,
          this.storedStudent.city_id = student.city_id,
          this.storedStudent.province_id = student.province_id,
          this.storedStudent.role_id = this.student_role_id
          try{
            const respone = await this.studentsService.update(this.storedStudent);
            this.router.navigate(['/perfil']);
          } catch(error) {
            alert("Ha ocurrido un error intentelo de nuevo más tarde")
          }
        }
      })
    } else {
      alert("Los datos introducidos son incorrectos. Por favor revise la información introducida.")
    }
  }

  checkControl(controlName: string, Error: string): boolean{
    let noErrors = false;
    if (this.studentForm.get(controlName)?.hasError(Error) && this.studentForm.get(controlName)?.touched) {
      noErrors = true;
    }
    return noErrors;
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.studentForm.get(controlName)?.status==="INVALID" && this.studentForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value;
    const passwordConfirm: string = pFormValue.get('passwordConfirm')?.value;
    if (password !== passwordConfirm) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }
}
