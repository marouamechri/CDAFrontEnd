import { TestBed } from '@angular/core/testing';

import { MyCostomDateAdapter } from './my-costom-date-adapter.service';

describe('MyCostomDateAdapterService', () => {
  let service: MyCostomDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCostomDateAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
