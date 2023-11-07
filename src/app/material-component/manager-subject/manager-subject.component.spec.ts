import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSubjectComponent } from './manager-subject.component';

describe('ManagerSubjectComponent', () => {
  let component: ManagerSubjectComponent;
  let fixture: ComponentFixture<ManagerSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSubjectComponent]
    });
    fixture = TestBed.createComponent(ManagerSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
