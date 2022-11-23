import { Component, OnInit } from '@angular/core';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {

  arrTeachers: Teacher[] = [];
  filterArrTeachers: Teacher[] = [];

  priceFilters: any[] = [
    { name: 'Price (low to high)', value: 'priceAsc' },
    { name: 'Price (high to low)', value: 'priceDes' },
  ];

  branchFilters: any = [
    { name: 'Ciencias', value: 'Ciencias', id: 'ciencias', isChecked: false },
    {
      name: 'Arte y Humanidades',
      value: 'Arte y Humanidades',
      id: 'arteHumanidades',
      isChecked: false,
    },
    {
      name: 'Ciencias de la Salud',
      value: 'Ciencias de la Salud',
      id: 'cienciasSalud',
      isChecked: false,
    },
    {
      name: 'Ingieniería y Arquitectura',
      value: 'Ingieniería y Arquitectura',
      id: 'ingieneriaArquitactura',
      isChecked: false,
    },
  ];

  selectedFilters = {
    branches: [
      'Ciencias',
      'Arte y Humanidades',
      'Ciencias de la Salud',
      'Ingieniería y Arquitectura',
    ],
    priceMax: 1199,
    priceMin: 1,
    exp: 100,
  };

  constructor(private teachersService: TeachersService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.teachersService.getAll();
      this.arrTeachers = response;
      this.filterArrTeachers = this.arrTeachers;
      this.filteredTeachers();
    }
    catch (err: any) {
      console.log(err.error)
    }
  }

  filteredTeachers() {
    this.filterArrTeachers = this.arrTeachers;
    const { branches, priceMax, priceMin, exp } = this.selectedFilters;

    this.filterArrTeachers = this.arrTeachers.filter(
      ({ branch_title, price_hour, experience }) =>
        branches.includes(branch_title) &&
        price_hour < priceMax &&
        price_hour > priceMin &&
        experience <= exp
    );
  }

  changesFilterBranches() {
    this.selectedFilters.branches = [];

    for (let i = 0; i < this.branchFilters.length; i++) {
      if (this.branchFilters[i].isChecked) {
        this.selectedFilters.branches.push(this.branchFilters[i].name);
      }
    }

    if (this.selectedFilters.branches.length == 0) {
      this.selectedFilters.branches = [
        'Ciencias',
        'Arte y Humanidades',
        'Ciencias de la Salud',
        'Ingieniería y Arquitectura',
      ];
    }

    this.filteredTeachers();
  }


  chanPrice() {}
  chanExperience() {}
}
