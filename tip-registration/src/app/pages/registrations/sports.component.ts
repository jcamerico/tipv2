import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { SportsService } from './sports.service';
import { RegistrationStatus, RegistrationSummary, SportReimbursementSummary } from './sports.model';
import { CommonModule } from '@angular/common';
import { SportCardComponent } from './components/sport-card/sport-card.component';
import { ReimbursementCardComponent } from './components/reimbursement-card/reimbursement-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCancellationModalComponent } from './components/user-cancellation-modal/user-cancellation-modal.component';
import { ReimbursementRequestModalComponent } from './components/reimbursement-request-modal/reimbursement-request-modal.component';

@Component({
  selector: 'app-sports',
  imports: [CommonModule, SportCardComponent, ReimbursementCardComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent implements OnInit {

  private readonly CANCELLED_STATUSES = [RegistrationStatus.CANCELLED_BY_USER, RegistrationStatus.REFUSED, RegistrationStatus.CANCELLED_WITH_REIMBURSEMENT];

  sports: WritableSignal<RegistrationSummary[]> = signal([]);
  registeredSports: Signal<RegistrationSummary[]> = computed(() => this.sports().filter(sport => sport.status === RegistrationStatus.REGISTERED));
  awaitingPayment: Signal<RegistrationSummary[]> = computed(() => this.sports().filter(sport => sport.status === RegistrationStatus.AWAITING_PAYMENT));
  pendingApproval: Signal<RegistrationSummary[]> = computed(() => this.sports().filter(sport => sport.status === RegistrationStatus.PENDING_APPROVAL));
  canceledOrRefused: Signal<RegistrationSummary[]> = computed(() => this.sports().filter(sport => this.CANCELLED_STATUSES.includes(sport.status)));

  reimbursements: WritableSignal<SportReimbursementSummary[]> = signal([]);


  constructor(private sportsService: SportsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.sportsService.getSports().subscribe(sports => {
      this.sports.set(sports);
    });
    this.sportsService.getSportReimbursements().subscribe(reimbursements => {
      this.reimbursements.set(reimbursements);
    });
  }



  addSport(): void {
    // Add a sport
  }

  cancelRegistration(uid: string) {
    const sport = this.sports().find(sport => sport.uid === uid);
    if (sport) {
      const modalRef = this.modalService.open(UserCancellationModalComponent, { centered: true });
      const component = modalRef.componentInstance as UserCancellationModalComponent;
      component.sportRegistration.set(sport);
      component.dismissed.subscribe(() => modalRef.dismiss());
      component.confirmed.subscribe(() => {
        modalRef.close();
        this.sportsService.cancelRegistration(uid).subscribe(
          () => this.sports.update(sports => {
            this.updateSportStatus(sports, uid, RegistrationStatus.CANCELLED_BY_USER);
            return [...sports];
          })
        );
      });
    }
  }

  private updateSportStatus(sports: RegistrationSummary[], uid: string, status: RegistrationStatus) {
    const updatedSport = sports.find(sport => sport.uid === uid);
    if (updatedSport) {
      updatedSport.status = status;
    }
  }

  triggerPayment(uid: string) {

  }

  modifyRegistration(uid: string) {

  }

  triggerUnregistration(uid: string) {
    const sport = this.sports().find(sport => sport.uid === uid);
    if (sport) {
      const modalRef = this.modalService.open(ReimbursementRequestModalComponent, { centered: true });
      const component = modalRef.componentInstance as ReimbursementRequestModalComponent;
      component.sportRegistration.set(sport);
      component.dismissed.subscribe(() => modalRef.dismiss());
      component.confirmed.subscribe((reason) => {
        modalRef.close();
        this.sportsService.createReimbursementRequest(reason, uid).subscribe(
          (reimbursementRequest) => {
            this.sports.update(sports => {
              this.setUnregistrationFlag(sports, uid);
              return [...sports];
            });
            this.reimbursements.update(reimbursements => [...reimbursements, reimbursementRequest]);
          });
      });
    }
  }

  private setUnregistrationFlag(sports: RegistrationSummary[], uid: string) {
    const updatedSport = sports.find(sport => sport.uid === uid);
    if (updatedSport) {
      updatedSport.unregistration = true;
    }
  }


}
