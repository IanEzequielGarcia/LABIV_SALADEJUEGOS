import { TestBed } from '@angular/core/testing';

import { GuardAdminServicioGuard } from './guard-admin-servicio.guard';

describe('GuardAdminServicioGuard', () => {
  let guard: GuardAdminServicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardAdminServicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
