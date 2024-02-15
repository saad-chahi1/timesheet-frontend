import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffecComponent } from './update-affec.component';

describe('UpdateAffecComponent', () => {
  let component: UpdateAffecComponent;
  let fixture: ComponentFixture<UpdateAffecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAffecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAffecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
