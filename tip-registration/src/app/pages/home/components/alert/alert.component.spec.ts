import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { ComponentRef } from '@angular/core';
import { AlertType } from '../../home.model';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let componentRef: ComponentRef<AlertComponent>;
  let fixture: ComponentFixture<AlertComponent>;

  const INFO_ALERT = {
    type: AlertType.Info,
    message: 'This is a test - info'
  };
  const WARNING_ALERT = {
    type: AlertType.Warning,
    message: 'This is a test - warning'
  };
  const ERROR_ALERT = {
    type: AlertType.Error,
    message: 'This is a test - error'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    componentRef.setInput('alert', INFO_ALERT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message with right class for information', () => {
    componentRef.setInput('alert', INFO_ALERT);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.alert-info'));
    expect(alert).toBeTruthy();
    expect(alert.nativeElement.innerHTML).toContain(INFO_ALERT.message);
  });

  it('should display message with right class for warning', () => {
    componentRef.setInput('alert', WARNING_ALERT);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.alert-warning'));
    expect(alert).toBeTruthy();
    expect(alert.nativeElement.innerHTML).toContain(WARNING_ALERT.message);

  });

  it('should display message with right class for error', () => {
    componentRef.setInput('alert', ERROR_ALERT);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(alert).toBeTruthy();
    expect(alert.nativeElement.innerHTML).toContain(ERROR_ALERT.message);
  });
});
