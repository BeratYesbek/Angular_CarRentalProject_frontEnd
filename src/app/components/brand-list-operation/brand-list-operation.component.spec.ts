import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListOperationComponent } from './brand-list-operation.component';

describe('BrandListOperationComponent', () => {
  let component: BrandListOperationComponent;
  let fixture: ComponentFixture<BrandListOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandListOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
