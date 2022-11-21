import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {LocationsService } from 'src/app/services/locations.service';
import { Branch } from 'src/app/interfaces/branch.interface';
import { BranchesService } from 'src/app/services/branches.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  
  registrationForm:FormGroup;
  teacher_role_id = 2
  provinces: Province[] = [];
  cities: City[] = [];
  citiesbyProvince: City[] = [];
  province_id!:string;
  branches:Branch[] = []


  constructor( 
    private locationsService: LocationsService,
    private branchesService: BranchesService,
    private usersService: UsersService) { 
    this.registrationForm  = new FormGroup({
      role_id: new FormControl('',[]),
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
      subject: new FormControl('',[])
    }, []);
  }
  
  ngOnInit(): void {
    this.getProvinces()
    this.getCities()
    this.getBranches()
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
    if (this.registrationForm.status === "VALID") {
      const user = this.usersService.findByEmail(this.registrationForm.value.email)
      if (user != null) {
        alert("Error al registrar el usuario.El correo utilizado ya existe.")
      } else {
        let formValues = this.registrationForm.value;
        let response
        let newStudent = formValues
        newStudent.latitude = 41.6704100
        newStudent.longitude = -3.6892000
        /*response = await this.teachersServince.create(newStudent)
        if (response?.id) {
          alert("El usuario ha sido creado correctamente.")
        } else {
          alert("Ha ocurrido un error intentelo de nuevo más tarde")
        }*/
      }
    } else {
      alert("Los datos introducidos son incorrectos. Por favor revise la información introducida.")
    }
  }

  checkControl(controlName: string, Error: string): boolean{
    let noErrors = false;
    if (this.registrationForm.get(controlName)?.hasError(Error) && this.registrationForm.get(controlName)?.touched) {
      noErrors = true;
    }
    return noErrors;
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.registrationForm.get(controlName)?.status==="INVALID" && this.registrationForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

  checkPassword(pFormValue: AbstractControl) {
    const password: string = pFormValue.get('password')?.value;
    const passwordConfirm: string = pFormValue.get('confirmPassword')?.value;
    if (password !== passwordConfirm) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }
}
