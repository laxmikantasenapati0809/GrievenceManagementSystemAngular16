import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroperationsComponent } from './manageroperations.component';

describe('ManageroperationsComponent', () => {
  let component: ManageroperationsComponent;
  let fixture: ComponentFixture<ManageroperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageroperationsComponent]
    });
    fixture = TestBed.createComponent(ManageroperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
