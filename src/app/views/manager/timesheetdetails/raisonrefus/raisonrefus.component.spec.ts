import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisonrefusComponent } from './raisonrefus.component';

describe('RaisonrefusComponent', () => {
  let component: RaisonrefusComponent;
  let fixture: ComponentFixture<RaisonrefusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisonrefusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisonrefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
