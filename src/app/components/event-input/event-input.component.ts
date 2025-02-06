import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { EventService } from '../../services/event.service'
import { CountdownService } from '../../services/countdown.service'

@Component({
  selector: 'app-event-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './event-input.component.html',
  styleUrls: ['./event-input.component.scss'],
})
export class EventInputComponent implements OnInit {
  eventForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private countdownService: CountdownService,
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      endDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadSavedEvent()

    this.eventForm.valueChanges.subscribe(() => {
      this.onEventDetailsChange()
    })
  }

  private loadSavedEvent(): void {
    const { eventName, endDate } = this.eventService.loadSavedEvent()

    if (eventName && endDate) {
      this.eventForm.patchValue({
        eventName: eventName,
        endDate: new Date(endDate),
      })
    }
  }

  onEventDetailsChange(): void {
    if (this.eventForm.valid && this.eventService.isValidDate(this.eventForm.value.endDate)) {
      this.eventService.saveEventToStorage(
        this.eventForm.value.eventName,
        this.eventForm.value.endDate,
      )
      this.eventService.updateEventName(this.eventForm.value.eventName)
      this.countdownService.startCountdown(this.eventForm.value.endDate)
    }
  }
}
