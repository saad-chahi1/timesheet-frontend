import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetprintviewComponent } from './timesheetprintview.component';

describe('TimesheetprintviewComponent', () => {
  let component: TimesheetprintviewComponent;
  let fixture: ComponentFixture<TimesheetprintviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetprintviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetprintviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
