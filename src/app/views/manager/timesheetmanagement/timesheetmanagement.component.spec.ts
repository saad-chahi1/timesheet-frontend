import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetmanagementComponent } from './timesheetmanagement.component';

describe('TimesheetmanagementComponent', () => {
  let component: TimesheetmanagementComponent;
  let fixture: ComponentFixture<TimesheetmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
