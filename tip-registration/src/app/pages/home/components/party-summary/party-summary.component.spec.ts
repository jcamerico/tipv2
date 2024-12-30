import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartySummaryComponent } from './party-summary.component';
import { ComponentRef } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('PartySummaryComponent', () => {
  let component: PartySummaryComponent;
  let componentRef: ComponentRef<PartySummaryComponent>;
  let fixture: ComponentFixture<PartySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartySummaryComponent],
      providers: [
        provideRouter([{ path: '**', component: PartySummaryComponent }]),
        provideLocationMocks(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PartySummaryComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('partyTickets', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display number of party tickets when it is positive', () => {
    componentRef.setInput('partyTickets', 10);
    fixture.detectChanges();
    const partyTickets = fixture.debugElement.query(By.css('.card-text'));
    expect(partyTickets.nativeElement.innerHTML).toContain('You have purchased 10 party tickets.');
  });

  it('should display special message for no party tickets', () => {
    componentRef.setInput('partyTickets', 0);
    fixture.detectChanges();
    const partyTickets = fixture.debugElement.query(By.css('.card-text'));
    expect(partyTickets.nativeElement.innerHTML).toContain('You have not purchased any party tickets.');
  });

});
