import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercardsessionComponent } from './mastercardsession.component';

describe('MastercardsessionComponent', () => {
  let component: MastercardsessionComponent;
  let fixture: ComponentFixture<MastercardsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercardsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercardsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
