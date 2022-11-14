import { Component, Input, OnInit } from '@angular/core';
import{ User } from 'src/app/interfaces/user.interface';
import{ Student } from 'src/app/interfaces/student.interface';
import { City } from 'src/app/interfaces/city.interface';
import { Province } from 'src/app/interfaces/province.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/utilities/utils';
import {LocationsService } from 'src/app/services/locations.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  studentForm:FormGroup;
  provinces: Province[] = [];
  cities: City[] = [];
  citiesbyProvince: City[] = [];
  province_id!:string;
  city_id!:string

  constructor(private utils: Utils,
    private locationsService: LocationsService) { 
    this.studentForm  = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]')
      ]),
      surname: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z]')
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordConfirm: new FormControl('',[
        Validators.required,
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[+][0-9]/),
        Validators.maxLength(13),
        Validators.minLength(11)
      ]),
      avatar: new FormControl('',[]),
    }, []);
  }
  
  ngOnInit(): void {
    this.getProvinceList()
  }

  async getProvinceList() {
    try{
      this.provinces =  await this.locationsService.getAllProvince()
      this.cities = await this.locationsService.getAllCities()
    } catch(error) {
      console.log (`FATAL : ${{error}}`)
    }
    
  }

  onSelected(){
    try{
      
      console.log(this.cities)
      this.citiesbyProvince = this.cities.filter(c => c.province_id == parseInt(this.province_id))
    } catch(error){
      console.log (`FATAL : ${{error}}`)
    }
    
  }

  getDataForm() {
    let formValues = this.studentForm.value;
    let newLocation = this.utils.createLocation(formValues)

    let newUser = this.utils.createNewUser(formValues, 1);
    let newStudent = this.utils.createStudent(formValues, 1)

    console.log(this.city_id, this.province_id)
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.studentForm.get(controlName)?.status==="INVALID" && this.studentForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

}
