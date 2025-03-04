import { TestBed } from '@angular/core/testing';

import { AchievementsService } from './achievements.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AchievementsService', () => {
  let service: AchievementsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AchievementsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call endpoint to read achievements', (done) => {
    const expectedAchievements = [
      {
        uid: '1234',
        name: 'Athlete 2025',
        description: 'You competed in 2025',
        icon: 'icon.jpg'
      }
    ];

    service.getAchievements().subscribe((achievements) => {
      expect(achievements).toEqual(expectedAchievements);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/achievements', 'Request to read achievements');
    expect(req.request.method).toBe('GET');
    req.flush(expectedAchievements);
  });
});
