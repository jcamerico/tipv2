import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSummaryComponent } from './sport-summary.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SportSummaryComponent', () => {
  let component: SportSummaryComponent;
  let componentRef: ComponentRef<SportSummaryComponent>;
  let fixture: ComponentFixture<SportSummaryComponent>;

  const LIST_WITH_SPORTS = ['Football', 'Basketball', 'Tennis'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSummaryComponent],
      providers: [
        provideRouter([{ path: '**', component: SportSummaryComponent }]),
        provideLocationMocks(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SportSummaryComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('sports', LIST_WITH_SPORTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of sports', () => {
    componentRef.setInput('sports', LIST_WITH_SPORTS);
    fixture.detectChanges();
    const partyTickets = fixture.debugElement.query(By.css('.card-text'));
    expect(partyTickets.nativeElement.innerHTML).toContain('You are registered for the following sports:');
    const listOfSports = fixture.debugElement.query(By.css('.list-group'));
    LIST_WITH_SPORTS.forEach(sport => {
      expect(listOfSports.nativeElement.innerHTML).toContain(sport);
    });
  });

  it('should display special message for no sports', () => {
    componentRef.setInput('sports', []);
    fixture.detectChanges();
    const partyTickets = fixture.debugElement.query(By.css('.card-text'));
    expect(partyTickets.nativeElement.innerHTML).toContain('You are not registered to any sports.');
  });
});
