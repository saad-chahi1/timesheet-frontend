import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprojectphaseviewComponent } from './clientprojectphaseview.component';

describe('ClientprojectphaseviewComponent', () => {
  let component: ClientprojectphaseviewComponent;
  let fixture: ComponentFixture<ClientprojectphaseviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientprojectphaseviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientprojectphaseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
