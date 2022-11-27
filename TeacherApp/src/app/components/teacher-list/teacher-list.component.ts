import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

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
      id: 'ingenieriaArquitactura',
      isChecked: false,
    },
  ];

  priceFilters: any = [
    { name: 'Todos los precios', value: 'all', id: 'price0' },
    { name: 'Entre 0€ y 5€', value: '5', id: 'price5' },
    { name: 'Entre 5€ y 10€', value: '10', id: 'price10' },
    { name: 'Mas de 10€', value: 'max', id: 'price15' },
  ];

  experienceFilters: any = [
    { name: 'Todos', value: '0', id: 'exp0' },
    { name: 'De 0 a 5', value: '5', id: 'exp5' },
    { name: 'De 5 a 10', value: '10', id: 'exp10' },
    { name: 'De 10 a 15', value: '15', id: 'exp15' },
    { name: 'De 15 a 20', value: '20', id: 'exp20' },
  ];

  ratingFilters: any = [
    { name: 'Todos', value: 'all', id: 'ra0' },
    { name: '⭐', value: '1', id: 'ra1' },
    { name: '⭐⭐', value: '2', id: 'ra2' },
    { name: '⭐⭐⭐', value: '3', id: 'ra3' },
    { name: '⭐⭐⭐⭐', value: '4', id: 'ra4' },
    { name: '⭐⭐⭐⭐⭐', value: '5', id: 'ra5' },
    { name: 'Sin valoración', value: '0', id: 'ra0' },
  ];

  selectedFilters = {
    branches: [
      'Ciencias',
      'Arte y Humanidades',
      'Ciencias de la Salud',
      'Ingieniería y Arquitectura',
    ],
    priceMax: 1000,
    priceMin: 1,
    expMax: 100,
    expMin: 0,
    ratMax: 5,
    ratMin: -1,
  };

  pageStart: number = 1;

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
    const { branches, priceMax, priceMin, expMin, expMax, ratMin, ratMax } =
      this.selectedFilters;

    this.filterArrTeachers = this.arrTeachers.filter(
      ({ branch_title, price_hour, experience, avg_rating }) =>
        branches.includes(branch_title) &&
        price_hour < priceMax &&
        price_hour > priceMin &&
        experience > expMin &&
        experience <= expMax &&
        avg_rating >= ratMin &&
        avg_rating <= ratMax
    );

    this.pageStart = 1;
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

  changesFilterPrices($event: any) {
    if ($event == 'all') {
      this.selectedFilters.priceMax = 1000;
      this.selectedFilters.priceMin = 0;
    } else if ($event == 'max') {
      this.selectedFilters.priceMax = 1000;
      this.selectedFilters.priceMin = 10;
    } else {
      this.selectedFilters.priceMax = parseInt($event);
      this.selectedFilters.priceMin = parseInt($event) - 5;
    }
    this.filteredTeachers();
  }

  changesFilterRatings($event: any) {
    if ($event == 'all') {
      this.selectedFilters.ratMax = 5;
      this.selectedFilters.ratMin = 0;
    } else if ($event === 0) {
      this.selectedFilters.priceMax = 0;
      this.selectedFilters.priceMin = 0;
    } else {
      this.selectedFilters.ratMax = parseInt($event);
      this.selectedFilters.ratMin = parseInt($event);
    }
    this.filteredTeachers();
  }

  resetfilters() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });

    this.selectedFilters = {
      branches: [
        'Ciencias',
        'Arte y Humanidades',
        'Ciencias de la Salud',
        'Ingieniería y Arquitectura',
      ],
      priceMax: 1000,
      priceMin: 1,
      expMax: 100,
      expMin: 0,
      ratMax: 5,
      ratMin: -1,
    };

    this.filteredTeachers();
  }
}
