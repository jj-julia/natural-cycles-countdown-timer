import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import the animations module
import { CountdownPageComponent } from './countdown-page.component';

describe('CountdownPageComponent', () => {
  let component: CountdownPageComponent;
  let fixture: ComponentFixture<CountdownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownPageComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the EventInputComponent', () => {
    const eventInputElement = fixture.nativeElement.querySelector('app-event-input');
    expect(eventInputElement).toBeTruthy();
  });

  it('should render the CountdownDisplayComponent', () => {
    const countdownDisplayElement = fixture.nativeElement.querySelector('app-countdown-display');
    expect(countdownDisplayElement).toBeTruthy();
  });
});



