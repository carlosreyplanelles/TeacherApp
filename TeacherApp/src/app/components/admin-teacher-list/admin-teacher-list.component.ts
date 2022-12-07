import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { Teacher } from 'src/app/interfaces/teacher.interface';
import { CustomPaginator } from './CustomPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-admin-teacher-list',
  templateUrl: './admin-teacher-list.component.html',
  styleUrls: ['./admin-teacher-list.component.css'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: CustomPaginator(),
    },
  ],
})
export class AdminTeacherListComponent implements AfterViewInit {

  selectStatus: any[] = [
    { value: '', viewValue: 'Todos' },
    { value: '0', viewValue: 'Activado' },
    { value: '1', viewValue: 'Desactivado' },
  ];

  displayedColumns: string[] = [
    'teacher_id',
    'name',
    'city',
    'branch_title',
    'contact',
    'validated',
    'admin',
  ];
  dataSource: MatTableDataSource<Teacher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private teachersService: TeachersService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterStatus(event: Event | string) {
    this.dataSource.filter = event.toString();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.filterPredicate = function (
      teacher: Teacher,
      filter: string
    ): boolean {
      return (
        teacher.name.toLowerCase().includes(filter) ||
        teacher.validated.toString() === filter
      );
    };

    try {
      let response = await this.teachersService.getAll();
      this.dataSource.data = response;
    } catch (err: any) {
      console.log(err.error);
    }
  }

  validateTeacher(teacherId: number) {
    const idTeacher = teacherId;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary me-3 ',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Deseas activar el usuario?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            // let response = await this.teachersService.delete(idTeacher);
            let response = await this.teachersService.validateTeacher(idTeacher);
            if (response.user_id) {
              swalWithBootstrapButtons.fire('Usuario activado');
              this.ngOnInit();
            } else {
              swalWithBootstrapButtons.fire(
                'Error',
                `${response.error}`,
                'error'
              );
            }
          } catch (error: any) {
            console.log(error.message);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no ha sido activado',
            'error'
          );
        }
      });
  }

  deleteTeacher(teacherId: number) {
    const idTeacher = teacherId;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary me-3 ',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Deseas borrar el usuario?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            // let response = await this.teachersService.delete(idTeacher);
            let response = await this.teachersService.delete(idTeacher);
            if (response.user_id) {
              swalWithBootstrapButtons.fire('Usuario borrado');
              this.ngOnInit();
            } else {
              swalWithBootstrapButtons.fire(
                'Error',
                `${response.error}`,
                'error'
              );
            }
          } catch (error: any) {
            console.log(error.message);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no ha sido borrado',
            'error'
          );
        }
      });
  }
}
