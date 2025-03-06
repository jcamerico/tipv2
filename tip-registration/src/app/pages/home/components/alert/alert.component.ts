import { Component, input } from '@angular/core';
import { Alert } from '../../home.model';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alert = input.required<Alert | undefined>()

}
