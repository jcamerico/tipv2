import { Component, OnInit, signal } from '@angular/core';
import { AchievementsService } from './achievements.service';
import { Achievement } from './achievements.model';

@Component({
  selector: 'app-achievements',
  imports: [],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent implements OnInit {

  achievements = signal<Achievement[]>([]);

  constructor(private achievementsService: AchievementsService) { }

  ngOnInit(): void {
    this.achievementsService.getAchievements().subscribe(achievements => this.achievements.set(achievements));
  }

}
