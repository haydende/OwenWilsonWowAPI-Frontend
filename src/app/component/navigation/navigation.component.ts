import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../../app.component.scss', './navigation.component.scss']
})
export class NavigationComponent {

  constructor(private router: Router) {}

  isCurrentPath(pathname: string): boolean {
      return this.router.url === pathname;
  }

}
