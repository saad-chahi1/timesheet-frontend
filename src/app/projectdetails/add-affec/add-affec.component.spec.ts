import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffecComponent } from './add-affec.component';

describe('AddAffecComponent', () => {
  let component: AddAffecComponent;
  let fixture: ComponentFixture<AddAffecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAffecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAffecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
