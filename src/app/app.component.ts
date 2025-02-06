import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { EventInputComponent } from './components/event-input/event-input.component';
import { CountdownDisplayComponent } from './components/countdown-display/countdown-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
