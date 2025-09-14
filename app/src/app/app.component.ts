import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractiveVideoComponent } from './interactive-video/interactive-video.component';
import { TestComponent } from "./test/test.component";

@Component({
  selector: 'app-root',
  imports: [TestComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'digital-story-telling';
}
