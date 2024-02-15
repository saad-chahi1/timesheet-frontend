import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemployetoprojectComponent } from './addemployetoproject.component';

describe('AddemployetoprojectComponent', () => {
  let component: AddemployetoprojectComponent;
  let fixture: ComponentFixture<AddemployetoprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddemployetoprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddemployetoprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
