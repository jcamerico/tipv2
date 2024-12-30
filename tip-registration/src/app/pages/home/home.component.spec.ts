import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { HomeService } from './home.service';
import { of } from 'rxjs';
import { AlertType } from './home.model';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const homeService = jasmine.createSpyObj('HomeService', ['getHomeContent', 'getAlerts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: HomeService, useValue: homeService }
      ]
    })
      .compileComponents();

    homeService.getHomeContent.and.returnValue(of(
      {
        sports: ['Football', 'Basketball', 'Tennis'],
        partyTickets: 10
      }
    ));

    homeService.getAlerts.and.returnValue(of([
      { type: AlertType.Info, message: 'This is a test - info' }
    ]));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display alerts', () => {
    const alert = fixture.debugElement.query(By.css('.alert'));
    expect(alert.nativeElement.innerHTML).toContain('This is a test - info');
  });

  it('should load and display registration info', () => {
    const sportSummary = fixture.debugElement.query(By.css('app-sport-summary'));
    expect(sportSummary).toBeTruthy();
  });

  it('should load and display party information', () => {
    const partySummary = fixture.debugElement.query(By.css('app-party-summary'));
    expect(partySummary).toBeTruthy();
  });

});
