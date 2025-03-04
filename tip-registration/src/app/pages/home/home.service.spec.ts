import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Alert, AlertType, HomeInfo } from './home.model';

describe('HomeService', () => {
  let service: HomeService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(HomeService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call endpoint to read alerts', (done) => {
    const alerts = [
      new Alert(AlertType.Warning, 'This is a warning'),
      new Alert(AlertType.Error, 'This is an error'),
      new Alert(AlertType.Info, 'This is an info'),
      new Alert()
    ];

    service.getAlerts().subscribe((alerts) => {
      expect(alerts).toEqual(alerts);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/alerts', 'Request to read alerts');
    expect(req.request.method).toBe('GET');
    req.flush(alerts);
  });

  it('should be call endpoint to read user summary', (done) => {
    const expectedContent = new HomeInfo();

    service.getHomeContent().subscribe((content) => {
      expect(content).toEqual(expectedContent);
      done();
    });

    const req = httpTesting.expectOne(service.SERVER_URL + '/summary', 'Request to read summary');
    expect(req.request.method).toBe('GET');
    req.flush(expectedContent);
  });
});
