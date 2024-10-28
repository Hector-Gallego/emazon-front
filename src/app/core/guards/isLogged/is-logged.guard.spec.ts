import { TestBed } from '@angular/core/testing';

import { IsLoguedGuard } from './is-logued.guard';

describe('IsLoguedGuard', () => {
  let guard: IsLoguedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoguedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
