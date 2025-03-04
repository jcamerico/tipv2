import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsComponent } from './achievements.component';
import { AchievementsService } from './achievements.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;

  const achievementsService = jasmine.createSpyObj('AchievementsService', ['getAchievements']);
  const achievements = [
    {
      uid: '1234',
      name: 'Athlete 2025',
      description: 'You competed in 2025',
      icon: 'icon.jpg'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsComponent],
      providers: [
        { provide: AchievementsService, useValue: achievementsService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    achievementsService.getAchievements.and.returnValue(of(achievements));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render achievements', () => {
    achievementsService.getAchievements.and.returnValue(of(achievements));
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toContain(achievements[0].icon);

    const caption = fixture.debugElement.query(By.css('figcaption'));
    expect(caption.nativeElement.innerText).toContain(achievements[0].name);
  });

  it('should display specific message when no achievement is found', () => {
    achievementsService.getAchievements.and.returnValue(of([]));
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeFalsy();

    const caption = fixture.debugElement.query(By.css('p'));
    expect(caption.nativeElement.innerText).toContain('You have not unlocked any achievement yet.');
  });
});
