import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTodayTotalComponent } from './merchant-today-total.component';

describe('MerchantTodayTotalComponent', () => {
  let component: MerchantTodayTotalComponent;
  let fixture: ComponentFixture<MerchantTodayTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantTodayTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTodayTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
