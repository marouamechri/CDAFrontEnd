import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureActionComponent } from './nature-action.component';

describe('NatureActionComponent', () => {
  let component: NatureActionComponent;
  let fixture: ComponentFixture<NatureActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatureActionComponent]
    });
    fixture = TestBed.createComponent(NatureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
