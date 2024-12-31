import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuComponent],
      providers: [
        provideRouter([
          { path: 'home', component: SideMenuComponent },
          { path: 'registrations', component: SideMenuComponent },
          { path: 'party', component: SideMenuComponent },
        ]),
        provideLocationMocks()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight the home button when current page is home', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/home');
    fixture.detectChanges();
    const activeLink = fixture.debugElement.query(By.css('.nav-link.active'));
    expect(activeLink.nativeElement.innerHTML).toContain("Home");
  });

  it('should highlight the home button when current page is registrations', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/registrations');
    fixture.detectChanges();
    const activeLink = fixture.debugElement.query(By.css('.nav-link.active'));
    expect(activeLink.nativeElement.innerHTML).toContain("Registrations");
  });

  it('should highlight the home button when current page is party', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/party');
    fixture.detectChanges();
    const activeLink = fixture.debugElement.query(By.css('.nav-link.active'));
    expect(activeLink.nativeElement.innerHTML).toContain("Party");
  });
});
