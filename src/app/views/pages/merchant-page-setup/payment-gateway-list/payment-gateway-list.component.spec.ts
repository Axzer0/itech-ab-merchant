import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayListComponent } from './payment-gateway-list.component';

describe('PaymentGatewayListComponent', () => {
  let component: PaymentGatewayListComponent;
  let fixture: ComponentFixture<PaymentGatewayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGatewayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
