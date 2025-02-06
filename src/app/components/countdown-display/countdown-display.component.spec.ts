import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CountdownDisplayComponent } from './countdown-display.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EventService } from '../../services/event.service'
import { CountdownService } from '../../services/countdown.service'

describe('CountdownDisplayComponent', () => {
  let component: CountdownDisplayComponent
  let fixture: ComponentFixture<CountdownDisplayComponent>
  let eventService: EventService
  let countdownService: CountdownService
  let updateEventNameSpy: jasmine.Spy
  let startCountdownSpy: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownDisplayComponent, BrowserAnimationsModule],
      providers: [
        EventService, // Provide EventService as a singleton
        CountdownService, // Provide CountdownService as a singleton
      ],
    }).compileComponents()

    eventService = TestBed.inject(EventService)
    countdownService = TestBed.inject(CountdownService)

    updateEventNameSpy = spyOn(eventService, 'updateEventName').and.callThrough()
    startCountdownSpy = spyOn(countdownService, 'startCountdown').and.callThrough()

    eventService.saveEventToStorage('Test Event', new Date('2023-12-31').toISOString())

    fixture = TestBed.createComponent(CountdownDisplayComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the countdown title', () => {
    fixture.detectChanges()
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.countdown-title')
    expect(titleElement.textContent).toContain('Test Event')
  })

  it('should display the countdown text', () => {
    fixture.detectChanges()
    const textElement: HTMLElement = fixture.nativeElement.querySelector('.countdown-text')
    expect(textElement).toBeTruthy()
    expect(textElement.textContent).toContain('0 days, 0 h, 0 m, 0 s') // Adjusted expected value
  })
})
