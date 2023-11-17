import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dComponent } from './file-upload.component';

describe('dComponent', () => {
  let component: dComponent;
  let fixture: ComponentFixture<dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [dComponent]
    });
    fixture = TestBed.createComponent(dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
