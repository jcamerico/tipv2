import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import Keycloak from 'keycloak-js';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const keyCloak = jasmine.createSpyObj('Keycloak', ['loadUserProfile', 'logout', 'createAccountUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: Keycloak, useValue: keyCloak }
      ]
    })
      .compileComponents();
    keyCloak.loadUserProfile.and.returnValue(Promise.resolve({ firstName: 'John', lastName: 'Doe' }));
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
