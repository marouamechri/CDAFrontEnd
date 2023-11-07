import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasMenusAcceuilComponent } from './bas-menus-acceuil.component';

describe('BasMenusAcceuilComponent', () => {
  let component: BasMenusAcceuilComponent;
  let fixture: ComponentFixture<BasMenusAcceuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasMenusAcceuilComponent]
    });
    fixture = TestBed.createComponent(BasMenusAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
