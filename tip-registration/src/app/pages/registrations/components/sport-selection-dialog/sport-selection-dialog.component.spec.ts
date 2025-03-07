import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSelectionDialogComponent } from './sport-selection-dialog.component';

describe('SportSelectionDialogComponent', () => {
  let component: SportSelectionDialogComponent;
  let fixture: ComponentFixture<SportSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSelectionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
