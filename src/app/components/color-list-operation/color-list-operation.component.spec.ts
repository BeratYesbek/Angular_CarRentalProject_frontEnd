import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorListOperationComponent } from './color-list-operation.component';

describe('ColorListOperationComponent', () => {
  let component: ColorListOperationComponent;
  let fixture: ComponentFixture<ColorListOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorListOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
