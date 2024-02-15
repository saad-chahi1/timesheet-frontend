import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatephaseComponent } from './updatephase.component';

describe('UpdatephaseComponent', () => {
  let component: UpdatephaseComponent;
  let fixture: ComponentFixture<UpdatephaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatephaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatephaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
