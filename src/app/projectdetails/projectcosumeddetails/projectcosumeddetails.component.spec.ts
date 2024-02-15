import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcosumeddetailsComponent } from './projectcosumeddetails.component';

describe('ProjectcosumeddetailsComponent', () => {
  let component: ProjectcosumeddetailsComponent;
  let fixture: ComponentFixture<ProjectcosumeddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectcosumeddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcosumeddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
