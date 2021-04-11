import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreditCardComponent } from './my-credit-card.component';

describe('MyCreditCardComponent', () => {
  let component: MyCreditCardComponent;
  let fixture: ComponentFixture<MyCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
