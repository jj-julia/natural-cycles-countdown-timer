import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TextResizerDirective } from '../../directives/text-resizer.directive'
import { CountdownService } from '../../services/countdown.service'
import { Subscription } from 'rxjs'
import { EventService } from '../../services/event.service'

@Component({
  selector: 'app-countdown-display',
  standalone: true,
  imports: [CommonModule, TextResizerDirective],
  templateUrl: './countdown-display.component.html',
  styleUrl: './countdown-display.component.scss',
})
export class CountdownDisplayComponent implements OnInit, OnDestroy {
  countdown: any
  eventName: string | null = localStorage.getItem('eventName')
  private countdownSubscription!: Subscription
  text: string = ''
  title: string = ''
  constructor(
    private countdownService: CountdownService,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.countdownSubscription = this.countdownService.countdown$.subscribe(countdown => {
      this.countdown = countdown
    })

    this.eventService.eventName$.subscribe(eventName => {
      this.eventName = eventName
    })
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe()
  }
}
