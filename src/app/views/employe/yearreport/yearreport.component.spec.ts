import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearreportComponent } from './yearreport.component';

describe('YearreportComponent', () => {
  let component: YearreportComponent;
  let fixture: ComponentFixture<YearreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
