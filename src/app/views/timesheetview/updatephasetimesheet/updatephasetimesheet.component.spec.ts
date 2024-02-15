import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatephasetimesheetComponent } from './updatephasetimesheet.component';

describe('UpdatephasetimesheetComponent', () => {
  let component: UpdatephasetimesheetComponent;
  let fixture: ComponentFixture<UpdatephasetimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatephasetimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatephasetimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
