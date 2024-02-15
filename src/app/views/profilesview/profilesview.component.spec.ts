import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesviewComponent } from './profilesview.component';

describe('ProfilesviewComponent', () => {
  let component: ProfilesviewComponent;
  let fixture: ComponentFixture<ProfilesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
