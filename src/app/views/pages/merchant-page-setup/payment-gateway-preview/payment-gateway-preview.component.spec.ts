import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayPreviewComponent } from './payment-gateway-preview.component';

describe('PaymentGatewayPreviewComponent', () => {
  let component: PaymentGatewayPreviewComponent;
  let fixture: ComponentFixture<PaymentGatewayPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGatewayPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
