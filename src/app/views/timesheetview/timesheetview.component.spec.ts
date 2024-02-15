import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetviewComponent } from './timesheetview.component';

describe('TimesheetviewComponent', () => {
  let component: TimesheetviewComponent;
  let fixture: ComponentFixture<TimesheetviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
