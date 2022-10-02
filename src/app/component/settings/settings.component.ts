import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() darkMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  saveSettings() {
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

}
