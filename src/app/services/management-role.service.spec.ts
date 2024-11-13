import { TestBed } from '@angular/core/testing';

import { ManagementRoleService } from './management-role.service';

describe('ManagementRoleService', () => {
  let service: ManagementRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
