import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPendingPaymentComponent } from './merchant-pending-payment.component';

describe('MerchantPendingPaymentComponent', () => {
  let component: MerchantPendingPaymentComponent;
  let fixture: ComponentFixture<MerchantPendingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantPendingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
