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

  experienceFilters: any = [
    { name: 'Todos los', value: '0', id: 'exp0'},
    { name: 'de 0 a 5', value: '5', id: 'exp5' },
    { name: 'de 5 a 10', value: '10', id: 'exp10' },
    { name: 'de 10 a 15', value: '15', id: 'exp15' },
    { name: 'de 15 a 20', value: '20', id: 'exp20' },
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
    expMax: 100,
    expMin: 0,
  };

  constructor(private teachersService: TeachersService) {}

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.teachersService.getAll();
      this.arrTeachers = response;
      this.filterArrTeachers = this.arrTeachers;
      this.filteredTeachers();
    } catch (err: any) {
      console.log(err.error);
    }
  }

  filteredTeachers() {
    this.filterArrTeachers = this.arrTeachers;
    const { branches, priceMax, priceMin, expMin, expMax } =
      this.selectedFilters;

    this.filterArrTeachers = this.arrTeachers.filter(
      ({ branch_title, price_hour, experience }) =>
        branches.includes(branch_title) &&
        price_hour < priceMax &&
        price_hour > priceMin &&
        experience > expMin &&
        experience <= expMax
    );

    console.log(this.selectedFilters);
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

  changesFilterExperiens($event: any) {
    if ($event == 0) {
      this.selectedFilters.expMax = 25;
      this.selectedFilters.expMin = 0;
    } else {
      this.selectedFilters.expMax = parseInt($event);
      this.selectedFilters.expMin = parseInt($event) - 5;
    }
    this.filteredTeachers();
  }
}
