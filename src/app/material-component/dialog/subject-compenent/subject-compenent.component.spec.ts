import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCompenent } from './subject-compenent';

describe('SubjectCompenentComponent', () => {
  let component: SubjectCompenent;
  let fixture: ComponentFixture<SubjectCompenent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectCompenent]
    });
    fixture = TestBed.createComponent(SubjectCompenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
