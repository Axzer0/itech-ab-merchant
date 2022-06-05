import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCredentialListComponent } from './app-credential-list.component';

describe('AppCredentialListComponent', () => {
  let component: AppCredentialListComponent;
  let fixture: ComponentFixture<AppCredentialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCredentialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCredentialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
