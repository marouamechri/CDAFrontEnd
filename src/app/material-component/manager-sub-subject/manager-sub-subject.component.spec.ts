import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubSubjectComponent } from './manager-sub-subject.component';

describe('ManagerSubSubjectComponent', () => {
  let component: ManagerSubSubjectComponent;
  let fixture: ComponentFixture<ManagerSubSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSubSubjectComponent]
    });
    fixture = TestBed.createComponent(ManagerSubSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
