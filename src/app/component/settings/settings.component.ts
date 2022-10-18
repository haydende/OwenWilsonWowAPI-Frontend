import { Component, Input } from '@angular/core';
import { Theme } from 'src/app/model/theme.model';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  @Input() currentTheme: Theme = Theme.DARK;

  themes = Object.keys(Theme);

  constructor(public themeService: ThemeService) {
      this.themeService.themeChanged$.subscribe((theme: Theme) => {
          this.currentTheme = theme;
      })
  }

  saveSettings() {
      this.themeService.applyTheme(this.currentTheme);
  }

}
