import { TestBed } from '@angular/core/testing';

import { GuardServicioGuard } from './guard-servicio.guard';

describe('GuardServicioGuard', () => {
  let guard: GuardServicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardServicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
