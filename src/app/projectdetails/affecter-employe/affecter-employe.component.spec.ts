import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterEmployeComponent } from './affecter-employe.component';

describe('AffecterEmployeComponent', () => {
  let component: AffecterEmployeComponent;
  let fixture: ComponentFixture<AffecterEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
