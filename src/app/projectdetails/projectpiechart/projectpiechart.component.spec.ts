import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpiechartComponent } from './projectpiechart.component';

describe('ProjectpiechartComponent', () => {
  let component: ProjectpiechartComponent;
  let fixture: ComponentFixture<ProjectpiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectpiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
