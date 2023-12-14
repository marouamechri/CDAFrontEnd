import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNatureActionComponent } from './manager-nature-action.component';

describe('ManagerNatureActionComponent', () => {
  let component: ManagerNatureActionComponent;
  let fixture: ComponentFixture<ManagerNatureActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerNatureActionComponent]
    });
    fixture = TestBed.createComponent(ManagerNatureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
