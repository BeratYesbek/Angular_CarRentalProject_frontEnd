import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRentalListOperationComponent } from './payment-rental-list-operation.component';

describe('PaymentRentalListOperationComponent', () => {
  let component: PaymentRentalListOperationComponent;
  let fixture: ComponentFixture<PaymentRentalListOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRentalListOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRentalListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
