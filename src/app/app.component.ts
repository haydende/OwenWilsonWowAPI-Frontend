import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'owen-wilson-wow-frontend';
  darkMode = false;

  constructor() {
    this.darkMode = localStorage.getItem('darkMode') == 'true';
    console.log(`Dark Mode? ${this.darkMode}`)
  }
}
