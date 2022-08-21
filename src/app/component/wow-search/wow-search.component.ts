import { Component, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';
import { WowHttpService } from 'src/app/service/wow.http.service';

@Component({
  selector: 'wow-search',
  templateUrl: './wow-search.component.html',
  styleUrls: ['./wow-search.component.css']
})
export class WowSearchComponent implements OnInit {

  wows: Wow[] = [];

  constructor(private wowService: WowHttpService) {
    wowService.getRandom()
      .subscribe((list) => this.wows = list);
  }

  ngOnInit(): void {
  }

}
