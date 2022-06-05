import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementUpdateComponent } from './settlement-update.component';

describe('SettlementUpdateComponent', () => {
  let component: SettlementUpdateComponent;
  let fixture: ComponentFixture<SettlementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
