import { Component, OnInit } from '@angular/core';
import { Wow } from '../wow';
import { WowHttpService } from '../wow.http.service';

@Component({
  selector: 'random-wow',
  templateUrl: './temp-wow.component.html',
  styleUrls: ['./temp-wow.component.css']
})
export class TempWowComponent implements OnInit {

  public randomWow!: Wow;

  constructor(private wowService: WowHttpService) { 
    console.log('Getting the random wow')
    wowService.getRandom().subscribe(response => {
      console.log(`Movie name: ${response[0].movie}`);
      this.randomWow = response[0];
    })
  }

  ngOnInit(): void {
  }

}
