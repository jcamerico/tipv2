import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TicketBuyComponent } from './ticket-buy.component';
import { provideRouter, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyService } from '../../party.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TicketCode } from '../../party.model';
import { inject } from '@angular/core';

describe('TicketBuyComponent', () => {
  let component: TicketBuyComponent;
  let fixture: ComponentFixture<TicketBuyComponent>;

  const partyService = jasmine.createSpyObj('PartyService', ['getPartyTicketPrice', 'getDrinkTicketPrice', 'getBasketTickets', 'saveBasketTickets']);
  const modalService = jasmine.createSpyObj('NgbModal', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketBuyComponent],
      providers: [
        { provide: PartyService, useValue: partyService },
        { provide: NgbModal, useValue: modalService },
        provideRouter([])
      ]
    })
      .compileComponents();

    partyService.getBasketTickets.and.returnValue({ partyTickets: [], drinkTickets: [] });
    partyService.getPartyTicketPrice.and.returnValue(of(10));
    partyService.getDrinkTicketPrice.and.returnValue(of(1));
    fixture = TestBed.createComponent(TicketBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add drink ticket and update total', () => {
    addDrinkTicket();

    const totalPriceElement = fixture.debugElement.query(By.css('#totalPrice'));
    expect(totalPriceElement.nativeElement.textContent).toEqual('Total: 1 €');
  });

  it('should add party ticket and update total', fakeAsync(() => {
    addPartyTicket();

    const totalPriceElement = fixture.debugElement.query(By.css('#totalPrice'));
    expect(totalPriceElement.nativeElement.textContent).toEqual('Total: 11 €');
  }));

  it('should remove drink ticket and update total', () => {
    addDrinkTicket();
    fixture.debugElement.query(By.css('.btn-close')).triggerEventHandler('click', null);
    fixture.detectChanges();

    const totalPriceElement = fixture.debugElement.query(By.css('#totalPrice'));
    expect(totalPriceElement.nativeElement.textContent).toEqual('Total: 0 €');
  });

  it('should remove party ticket and update total', fakeAsync(() => {
    addPartyTicket();
    fixture.debugElement.query(By.css('.btn-close')).triggerEventHandler('click', null);
    fixture.detectChanges();

    const totalPriceElement = fixture.debugElement.query(By.css('#totalPrice'));
    expect(totalPriceElement.nativeElement.textContent).toEqual('Total: 0 €');
  }));

  it('should save basket and navigate to checkout page', () => {
    const spy = spyOn(TestBed.inject(Router), 'navigate');
    fixture.debugElement.query(By.css('.btn-outline-primary')).triggerEventHandler('click', null);
    fixture.detectChanges();


    expect(partyService.saveBasketTickets).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(['party', 'checkout']);
  });


  function addPartyTicket(): void {
    modalService.open.and.returnValue({ result: Promise.resolve(new TicketCode(5, '', false, 'John DOE')) });
    fixture.debugElement.query(By.css('#addPartyTicketButton')).triggerEventHandler('click', null);
    fixture.detectChanges();

    tick();
    tick();
    fixture.detectChanges();
  }

  function addDrinkTicket() {
    fixture.debugElement.query(By.css('#addDrinkTicketButton')).triggerEventHandler('click', null);
    fixture.detectChanges();
  }

});
