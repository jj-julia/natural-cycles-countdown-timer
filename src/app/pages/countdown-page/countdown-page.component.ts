import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountdownDisplayComponent } from '../../components/countdown-display/countdown-display.component';
import { EventInputComponent } from '../../components/event-input/event-input.component';

@Component({
  selector: 'app-countdown-page',
  standalone: true,
  imports: [
    FormsModule,
    EventInputComponent,
    CountdownDisplayComponent,
  ],
  templateUrl: './countdown-page.component.html',
  styleUrl: './countdown-page.component.scss'
})
export class CountdownPageComponent {

}
