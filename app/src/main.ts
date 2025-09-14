import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InteractiveVideoComponent } from './app/interactive-video/interactive-video.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
