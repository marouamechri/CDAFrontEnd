import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTaskComponent } from './manager-task.component';

describe('ManagerTaskComponent', () => {
  let component: ManagerTaskComponent;
  let fixture: ComponentFixture<ManagerTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTaskComponent]
    });
    fixture = TestBed.createComponent(ManagerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
