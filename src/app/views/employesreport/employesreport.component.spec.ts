import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesreportComponent } from './employesreport.component';

describe('EmployesreportComponent', () => {
  let component: EmployesreportComponent;
  let fixture: ComponentFixture<EmployesreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployesreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
