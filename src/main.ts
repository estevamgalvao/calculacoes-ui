import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

if (environment.production) {
  // Disable console.log in production
  window.console.log = () => {};
  window.console.debug = () => {};
  // console.warn, console.info e console.error keep to log warnings and errors
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));