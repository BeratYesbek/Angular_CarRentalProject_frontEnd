import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDemandComponent } from './customer-demand.component';

describe('CustomerDemandComponent', () => {
  let component: CustomerDemandComponent;
  let fixture: ComponentFixture<CustomerDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
