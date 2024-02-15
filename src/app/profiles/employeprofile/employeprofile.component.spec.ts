import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeprofileComponent } from './employeprofile.component';

describe('EmployeprofileComponent', () => {
  let component: EmployeprofileComponent;
  let fixture: ComponentFixture<EmployeprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
