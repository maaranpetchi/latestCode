import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VleadInformationSystemUIAngular';
  currentUrl: string;

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    this.currentUrl = window.location.href;
    console.log('Current URL:', this.currentUrl);
    return this.currentUrl;
    // You can store or handle the current URL here as needed.
  }
}
