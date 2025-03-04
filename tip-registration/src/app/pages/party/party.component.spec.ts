import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyComponent } from './party.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PartyComponent', () => {
  let component: PartyComponent;
  let fixture: ComponentFixture<PartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
