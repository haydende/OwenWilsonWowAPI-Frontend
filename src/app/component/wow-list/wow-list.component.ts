import { Component, Input, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';

@Component({
  selector: 'wow-list',
  templateUrl: './wow-list.component.html',
  styleUrls: ['./wow-list.component.scss']
})
export class WowListComponent implements OnInit {

  @Input() public wows: Wow[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
