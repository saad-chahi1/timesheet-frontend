import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectiondetailsviewComponent } from './rejectiondetailsview.component';

describe('RejectiondetailsviewComponent', () => {
  let component: RejectiondetailsviewComponent;
  let fixture: ComponentFixture<RejectiondetailsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectiondetailsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectiondetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
