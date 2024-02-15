import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphasetimesheetComponent } from './addphasetimesheet.component';

describe('AddphasetimesheetComponent', () => {
  let component: AddphasetimesheetComponent;
  let fixture: ComponentFixture<AddphasetimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddphasetimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddphasetimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
