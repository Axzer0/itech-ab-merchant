import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAppCredentialComponent } from './generate-app-credential.component';

describe('GenerateAppCredentialComponent', () => {
  let component: GenerateAppCredentialComponent;
  let fixture: ComponentFixture<GenerateAppCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAppCredentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAppCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
