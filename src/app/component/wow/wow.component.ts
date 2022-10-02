import { Component, Input, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';

@Component({
  selector: 'wow',
  templateUrl: './wow.component.html',
  styleUrls: ['./wow.component.scss']
})
export class WowComponent implements OnInit {

  @Input() wow: Wow = new Wow();

  constructor() { 
  }

  ngOnInit(): void {
  }

}
