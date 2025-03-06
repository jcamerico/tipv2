import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCheckoutComponent } from './ticket-checkout.component';
import { PartyService } from '../../party.service';
import { provideRouter } from '@angular/router';
import { BasketTicket, TicketCode } from '../../party.model';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('TicketCheckoutComponent', () => {
  let component: TicketCheckoutComponent;
  let fixture: ComponentFixture<TicketCheckoutComponent>;

  const partyService = jasmine.createSpyObj('PartyService', ['getCouponReduction', 'getBasketTickets']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCheckoutComponent],
      providers: [
        { provide: PartyService, useValue: partyService },
        provideRouter([])
      ]
    })
      .compileComponents();
    partyService.getBasketTickets.and.returnValue(
      {
        partyTickets: [new BasketTicket(new TicketCode(5, '', false, 'John DOE'), 10, 1)],
        drinkTickets: [new BasketTicket(new TicketCode(5), 10, 1)]
      }
    );
    fixture = TestBed.createComponent(TicketCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute total price', () => {
    expect(getTotalPrice()).toEqual('Total: 12 €');
  });

  it('should raise error when coupon is not valid', () => {
    partyService.getCouponReduction.and.returnValue(throwError(() => new Error('invalid coupon')));

    component.coupon.set('INVALID_COUPON');
    fixture.debugElement.query(By.css('#applyCouponButton')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.alert-danger')).nativeElement.textContent).toContain('Invalid coupon code: INVALID_COUPON');
  });

  it('should apply discount when coupon is valid', () => {
    partyService.getCouponReduction.and.returnValue(of({ couponCode: 'VALID_COUPON', description: 'valid coupon', reduction: 2 }));

    component.coupon.set('VALID_COUPON');
    fixture.debugElement.query(By.css('#applyCouponButton')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(getTotalPrice()).toEqual('Total: 10 €');
  });

  function getTotalPrice(): string {
    return fixture.debugElement.query(By.css('#totalPrice')).nativeElement.textContent;
  }

});
