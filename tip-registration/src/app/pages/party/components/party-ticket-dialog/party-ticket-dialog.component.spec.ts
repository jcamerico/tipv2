import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyTicketDialogComponent } from './party-ticket-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('PartyTicketDialogComponent', () => {
  let component: PartyTicketDialogComponent;
  let fixture: ComponentFixture<PartyTicketDialogComponent>;

  const activeModal = jasmine.createSpyObj('NgbActiveModal', ['dismiss', 'close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyTicketDialogComponent],
      providers: [
        { provide: NgbActiveModal, useValue: activeModal }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PartyTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable add button while ticket owner is not informed', () => {
    component.ticketOwner.set('');
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css('.btn-primary'));
    expect(addButton.nativeElement.disabled).toBeTrue();
  });

  it('should dismiss when user clicks on cancel', () => {
    fixture.debugElement.query(By.css('.btn-tertiary')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(activeModal.dismiss).toHaveBeenCalled();
  });

  it('should send ticket information with drinks when user clicks on the button', () => {
    component.ticketOwner.set('John DOE');
    component.addDrinks.set(true);
    fixture.debugElement.query(By.css('.btn-primary')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(activeModal.close).toHaveBeenCalledWith(
      {
        uid: '',
        party: true,
        owner: 'John DOE',
        drinks: 5,
        scanned: false
      }
    );
  });

  it('should send ticket information without drinks when user clicks on the button', () => {
    component.ticketOwner.set('John DOE');
    component.addDrinks.set(false);
    fixture.debugElement.query(By.css('.btn-primary')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(activeModal.close).toHaveBeenCalledWith(
      {
        uid: '',
        party: true,
        owner: 'John DOE',
        drinks: 0,
        scanned: false
      }
    );
  });

});
