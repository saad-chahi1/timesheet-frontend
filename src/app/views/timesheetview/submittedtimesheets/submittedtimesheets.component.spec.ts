import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedtimesheetsComponent } from './submittedtimesheets.component';

describe('SubmittedtimesheetsComponent', () => {
  let component: SubmittedtimesheetsComponent;
  let fixture: ComponentFixture<SubmittedtimesheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedtimesheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedtimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
