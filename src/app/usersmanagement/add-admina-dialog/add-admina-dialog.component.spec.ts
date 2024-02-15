import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminaDialogComponent } from './add-admina-dialog.component';

describe('AddAdminaDialogComponent', () => {
  let component: AddAdminaDialogComponent;
  let fixture: ComponentFixture<AddAdminaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
