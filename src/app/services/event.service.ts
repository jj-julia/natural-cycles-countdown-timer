import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventNameSubject = new BehaviorSubject<string | null>(null);
  eventName$ = this.eventNameSubject.asObservable();

  loadSavedEvent(): { eventName: string | null; endDate: string | null } {
    const eventName = localStorage.getItem('eventName');
    const endDate = localStorage.getItem('endDate');
    this.eventNameSubject.next(eventName);
    return { eventName, endDate };
  }

  updateEventName(eventName: string) {
    this.eventNameSubject.next(eventName);
  }

  saveEventToStorage(eventName: string, endDate: string): void {
    try {
      localStorage.setItem('eventName', eventName);
      localStorage.setItem('endDate', endDate);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  isValidDate(date: string): boolean {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }
}
