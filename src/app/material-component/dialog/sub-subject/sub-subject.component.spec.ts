import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubjectComponent } from './sub-subject.component';

describe('SubSubjectComponent', () => {
  let component: SubSubjectComponent;
  let fixture: ComponentFixture<SubSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSubjectComponent]
    });
    fixture = TestBed.createComponent(SubSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
