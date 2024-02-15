import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphaseComponent } from './addphase.component';

describe('AddphaseComponent', () => {
  let component: AddphaseComponent;
  let fixture: ComponentFixture<AddphaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddphaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
