import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingListComponent } from './admin-pending-list.component';

describe('AdminPendingListComponent', () => {
  let component: AdminPendingListComponent;
  let fixture: ComponentFixture<AdminPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
