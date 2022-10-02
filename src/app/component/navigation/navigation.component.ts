import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../../app.component.css', './navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  isCurrentPath(pathname: string): boolean {
      return location.pathname === pathname;  
  }

}
