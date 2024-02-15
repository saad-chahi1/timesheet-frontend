import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeprojectdurationdetailsComponent } from './employeprojectdurationdetails.component';

describe('EmployeprojectdurationdetailsComponent', () => {
  let component: EmployeprojectdurationdetailsComponent;
  let fixture: ComponentFixture<EmployeprojectdurationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeprojectdurationdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeprojectdurationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
