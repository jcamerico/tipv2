import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import Keycloak from 'keycloak-js';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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
    expect(component.authenticated()).toBeTrue();
  });

  it('should display user first and last name', () => {
    fixture.detectChanges();

    const userGreetings = fixture.debugElement.query(By.css('#userGreetings'));
    expect(userGreetings.nativeElement.innerHTML).toContain('Welcome John DOE');
  });

  it('should logout when user clicks on logout', fakeAsync(() => {
    keyCloak.logout.and.returnValue(Promise.resolve());
    fixture.detectChanges();
    tick();

    fixture.debugElement.query(By.css('#logoutButton')).nativeElement.click();
    tick();

    expect(keyCloak.logout).toHaveBeenCalled();
    expect(component.authenticated()).toBeFalse();
  }));

});
