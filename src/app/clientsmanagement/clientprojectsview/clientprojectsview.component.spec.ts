import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprojectsviewComponent } from './clientprojectsview.component';

describe('ClientprojectsviewComponent', () => {
  let component: ClientprojectsviewComponent;
  let fixture: ComponentFixture<ClientprojectsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientprojectsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientprojectsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
