import { TestBed } from '@angular/core/testing';

import { ConfirmationOutComponentTimesheettGuard } from './confirmation-out-component-timesheett.guard';

describe('ConfirmationOutComponentTimesheettGuard', () => {
  let guard: ConfirmationOutComponentTimesheettGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmationOutComponentTimesheettGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
