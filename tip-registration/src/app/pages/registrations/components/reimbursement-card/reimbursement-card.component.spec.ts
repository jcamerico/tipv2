import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementCardComponent } from './reimbursement-card.component';
import { ReimbursementStatus, ReimbursementType, SportReimbursementSummary, SportType } from '../../sports.model';
import { ComponentRef } from '@angular/core';

describe('ReimbursementCardComponent', () => {
  let component: ReimbursementCardComponent;
  let componentRef: ComponentRef<ReimbursementCardComponent>;
  let fixture: ComponentFixture<ReimbursementCardComponent>;
  const reimbursement: SportReimbursementSummary = {
    uid: '123',
    sportUid: '123',
    sport: SportType.VOLLEY_243,
    type: ReimbursementType.TOTAL,
    status: ReimbursementStatus.OPEN,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
    reason: 'Injury'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReimbursementCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('reimbursement', reimbursement);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
