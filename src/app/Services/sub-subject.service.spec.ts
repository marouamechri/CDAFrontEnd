import { TestBed } from '@angular/core/testing';

import { SubSubjectService } from './sub-subject.service';

describe('SubSubjectService', () => {
  let service: SubSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
