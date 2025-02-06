// src/app/services/countdown.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject, interval } from 'rxjs'
import { takeWhile } from 'rxjs/operators'
import { EventService } from './event.service'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubject = new BehaviorSubject<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  countdown$ = this.countdownSubject.asObservable()
  private countdownSubscription: any

  constructor(private eventService: EventService) {
    this.loadInitialCountdown()
  }

  private loadInitialCountdown() {
    const { endDate } = this.eventService.loadSavedEvent()
    if (endDate) {
      this.startCountdown(endDate)
    }
  }

  startCountdown(endDate: string) {
    this.clearCountdown()

    const endTime = new Date(endDate).getTime()

    this.countdownSubscription = interval(1000)
      .pipe(
        takeWhile(() => {
          const now = new Date().getTime()
          return now < endTime
        }),
      )
      .subscribe(() => {
        this.updateCountdown(endDate)
      })
  }

  clearCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe()
      this.countdownSubscription = null
    }
  }

  private updateCountdown(endDate: string) {
    const endTime = new Date(endDate).getTime()
    const now = new Date().getTime()
    const timeLeft = endTime - now

    if (isNaN(endTime)) {
      this.clearCountdown()
      return
    }

    if (timeLeft < 0) {
      this.clearCountdown()
      return
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    this.countdownSubject.next({ days, hours, minutes, seconds })
  }
}
