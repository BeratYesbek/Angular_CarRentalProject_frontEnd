import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandColorManagerComponent } from './brand-color-manager.component';

describe('BrandColorManagerComponent', () => {
  let component: BrandColorManagerComponent;
  let fixture: ComponentFixture<BrandColorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandColorManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandColorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
