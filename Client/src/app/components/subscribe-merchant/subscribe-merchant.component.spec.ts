import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeMerchantComponent } from './subscribe-merchant.component';

describe('SubscribeMerchantComponent', () => {
  let component: SubscribeMerchantComponent;
  let fixture: ComponentFixture<SubscribeMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
