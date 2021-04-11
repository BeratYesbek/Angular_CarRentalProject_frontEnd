import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerManagerComponent } from './user-customer-manager.component';

describe('UserCustomerManagerComponent', () => {
  let component: UserCustomerManagerComponent;
  let fixture: ComponentFixture<UserCustomerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
