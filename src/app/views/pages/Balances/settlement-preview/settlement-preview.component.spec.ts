import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementPreviewComponent } from './settlement-preview.component';

describe('SettlementPreviewComponent', () => {
  let component: SettlementPreviewComponent;
  let fixture: ComponentFixture<SettlementPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
