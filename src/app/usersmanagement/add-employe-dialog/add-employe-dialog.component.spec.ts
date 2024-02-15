import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeDialogComponent } from './add-employe-dialog.component';

describe('AddEmployeDialogComponent', () => {
  let component: AddEmployeDialogComponent;
  let fixture: ComponentFixture<AddEmployeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
