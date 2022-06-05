import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSettlementComponent } from './create-settlement.component';

describe('CreateSettlementComponent', () => {
  let component: CreateSettlementComponent;
  let fixture: ComponentFixture<CreateSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
