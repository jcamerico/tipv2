import { Component, computed, OnInit, signal } from '@angular/core';
import { TicketCode } from './party.model';
import { PartyService } from './party.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-party',
  imports: [QRCodeComponent, RouterModule],
  templateUrl: './party.component.html'
})
export class PartyComponent implements OnInit {

  qrCodes = signal<TicketCode[]>([]);
  partyCodes = computed(() => this.qrCodes().filter(code => code.party));
  drinkCodes = computed(() => this.qrCodes().filter(code => !code.party));

  constructor(private partyService: PartyService) { }

  ngOnInit(): void {
    this.partyService.getTicketCodes().subscribe(codes => this.qrCodes.set(codes));
  }

}
