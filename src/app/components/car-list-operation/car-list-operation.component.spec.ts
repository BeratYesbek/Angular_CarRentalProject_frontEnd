import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListOperationComponent } from './car-list-operation.component';

describe('CarListOperationComponent', () => {
  let component: CarListOperationComponent;
  let fixture: ComponentFixture<CarListOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarListOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
