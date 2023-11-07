import { TestBed } from '@angular/core/testing';

import { MedicalSpecialtyService } from './medical-specialty.service';

describe('MedicalSpecialtyService', () => {
  let service: MedicalSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalSpecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
