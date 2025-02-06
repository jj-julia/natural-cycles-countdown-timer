import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EventInputComponent } from './event-input.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EventService } from '../../services/event.service'
import { CountdownService } from '../../services/countdown.service'
import { ReactiveFormsModule } from '@angular/forms'

describe('EventInputComponent', () => {
  let component: EventInputComponent
  let fixture: ComponentFixture<EventInputComponent>
  let eventService: EventService
  let countdownService: CountdownService
  let updateEventNameSpy: jasmine.Spy
  let startCountdownSpy: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInputComponent, BrowserAnimationsModule, ReactiveFormsModule],
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

    fixture = TestBed.createComponent(EventInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the form with values from local storage', () => {
    expect(component.eventForm.value.eventName).toBe('Test Event')
    expect(component.eventForm.value.endDate).toEqual(new Date('2023-12-31'))
  })

  // it('should call the service methods when updating the form', () => {
  //   component.eventForm.patchValue({
  //     eventName: 'Updated Test Event',
  //     endDate: new Date('2025-12-31').toISOString,
  //   })
  //   // component.onEventDetailsChange() // Call the method to handle the change

  //   expect(updateEventNameSpy).toHaveBeenCalledWith('Updated Test Event')
  //   expect(startCountdownSpy).toHaveBeenCalledWith(new Date('2025-12-31').toISOString())
  // })
})
