import { TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { AppComponent } from './app.component';
import Keycloak from 'keycloak-js';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {

  const keyCloak = jasmine.createSpyObj('Keycloak', ['loadUserProfile', 'logout', 'createAccountUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: Keycloak, useValue: keyCloak }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'tip-registration' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tip-registration');
  });

});
