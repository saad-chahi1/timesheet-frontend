import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsavechangesComponent } from './alertsavechanges.component';

describe('AlertsavechangesComponent', () => {
  let component: AlertsavechangesComponent;
  let fixture: ComponentFixture<AlertsavechangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsavechangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsavechangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
