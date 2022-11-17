import { Component, Input, OnInit } from '@angular/core';
import{ User } from 'src/app/interfaces/user.interface';
import{ Student } from 'src/app/interfaces/student.interface';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {LocationsService } from 'src/app/services/locations.service';
import { Branch } from 'src/app/interfaces/branch.interface';
import { BranchesService } from 'src/app/services/branches.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  
  studentForm:FormGroup;
  student_role_id = 3
  teacher_role_id = 2
  provinces: Province[] = [];
  cities: City[] = [];
  citiesbyProvince: City[] = [];
  province_id!:string;
  branches:Branch[] = []
  branch_id!: string;
  city_id!:string;
  role !: string;
  role_id: number = this.student_role_id


  constructor( 
    private locationsService: LocationsService,
    private branchesService: BranchesService,
    private studentsServince: StudentsService,
    private activatedRoute: ActivatedRoute) { 
    this.studentForm  = new FormGroup({
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
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[+][0-9]+$/),
        Validators.maxLength(13),
        Validators.minLength(11)
      ]),
      city_id: new FormControl('',[]),
      address: new FormControl('',[]),
      
      avatar: new FormControl('',[]),
    }, []);
  }
  
  ngOnInit(): void {
    this.getProvinces()
    this.getCities()
    this.getBranches()
    this.activatedRoute.params.subscribe((params: any) => {
      if(params.role === 'profesor'){
        this.studentForm.addControl('price_hour', new FormControl('', Validators.required));
        this.studentForm.addControl('branch_id', new FormControl('', Validators.required));
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
    if (this.studentForm.status === "VALID") {
      let formValues = this.studentForm.value;
      let response
      if (formValues.role_id == this.student_role_id) {
        let newStudent = formValues
        newStudent.role_id = this.role_id
        newStudent.latitude = 41.6704100
        newStudent.longitude = -3.6892000
        response = await this.studentsServince.create(newStudent)
      } 
      console.log(response)
      if (response?.id) {
        alert("El usuario ha sido creado correctamente.")
      } else {
        alert("Ha ocurrido un error intentelo de nuevo más tarde")
      }
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
    const passwordConfirm: string = pFormValue.get('repeatpassword')?.value;
    if (password !== passwordConfirm) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }


  changeType(e:any){
    this.role = e.target.value;
  }
}
