import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInactiveListComponent } from './admin-inactive-list.component';

describe('AdminInactiveListComponent', () => {
  let component: AdminInactiveListComponent;
  let fixture: ComponentFixture<AdminInactiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInactiveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInactiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
