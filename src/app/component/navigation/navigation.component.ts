import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../../app.component.scss', './navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  isCurrentPath(pathname: string): boolean {
      return location.pathname === pathname;  
  }

}
