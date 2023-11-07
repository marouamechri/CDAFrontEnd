import { TestBed } from '@angular/core/testing';

import { NatureActionService } from './nature-action.service';

describe('NatureActionService', () => {
  let service: NatureActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
