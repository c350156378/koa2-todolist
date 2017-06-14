import { TestBed, async, inject } from '@angular/core/testing';

import { MyNewGuardGuard } from './my-new-guard.guard';

describe('MyNewGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyNewGuardGuard]
    });
  });

  it('should ...', inject([MyNewGuardGuard], (guard: MyNewGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
