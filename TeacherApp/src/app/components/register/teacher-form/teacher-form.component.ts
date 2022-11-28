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
      city_id: new FormControl('',[Validators.required]),
      avatar: new FormControl('',[]),
      price_hour: new FormControl('',[Validators.required]),
      branch_id: new FormControl('',[Validators.required]),
      experience: new FormControl('',[Validators.pattern(/^[0-9]+$/), Validators.maxLength(2)]),
      subjects: new FormControl('',[]),
      validated: new FormControl(0,[Validators.required])
    }, [this.checkPassword]);
  }
  
  ngOnInit(): void {
    this.getProvinces()
    this.getCities()
    this.getBranches()
    this.activatedRoute.params.subscribe(async (params: any) => {

      this.accion="Actualizar"

      if (params.teacherId) {
        this.accion = "Actualizar"
        this.storedTeacher = await this.teachersService.getById(params.teacherId)
        this.citiesbyProvince = this.cities.filter(c => c.province_id == parseInt(this.storedTeacher.province_id))

        this.teacherForm.patchValue({
          name: this.storedTeacher.name,
          surname: this.storedTeacher.surname,
          email: this.storedTeacher.email,
          password: this.storedTeacher.password,
          address: this.storedTeacher.address,
          avatar: this.storedTeacher.avatar,
          phone: this.storedTeacher.phone,
          city_id: this.storedTeacher.city_id,
          province_id: this.storedTeacher.province_id,
          subjects: this.storedTeacher.subjects,
          branch_id : this.storedTeacher.branch_id,
          experience : this.storedTeacher.experience,
          price_hour : this.storedTeacher.price_hour
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

  async getBranches(){
    try{
      this.branches = await this.branchesService.getAll()
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
    if (this.teacherForm.status === "VALID") {
      this.activatedRoute.params.subscribe(async (params: any) => {
        const user = await this.usersService.findByEmail(this.teacherForm.value.email)
        let response
        let teacher = this.teacherForm.value
        if (!params.teacherId) {
          if (user != null) {
            alert("Error al registrar el usuario.El correo utilizado ya existe.")
          } else {
            response = await this.teachersService.create(teacher)
            if (response.teacher_id) {
              alert("El usuario ha sido creado correctamente.")
            } else {
              alert("Ha ocurrido un error intentelo de nuevo más tarde")
            }
          }
        } else{
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
          this.storedTeacher.role_id = this.teacher_role_id
          try{
            const respone = await this.teachersService.update(this.storedTeacher);
            this.router.navigate(['/perfil']);
          } catch(error) {
            console.log(error);
            alert("Ha ocurrido un error intentelo de nuevo más tarde 2")
          }
        }
      })
    } else {
      alert("Los datos introducidos son incorrectos. Por favor revise la información introducida.")
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
    } else {
      return null
    }
  }
}
