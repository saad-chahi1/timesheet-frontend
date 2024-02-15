import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsArchivComponent } from './projets-archiv.component';

describe('ProjetsArchivComponent', () => {
  let component: ProjetsArchivComponent;
  let fixture: ComponentFixture<ProjetsArchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetsArchivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetsArchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
