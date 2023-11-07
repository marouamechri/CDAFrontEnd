import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBinderComponent } from './manager-binder.component';

describe('ManagerBinderComponent', () => {
  let component: ManagerBinderComponent;
  let fixture: ComponentFixture<ManagerBinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerBinderComponent]
    });
    fixture = TestBed.createComponent(ManagerBinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
