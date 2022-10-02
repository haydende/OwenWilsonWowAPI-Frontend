import { Component, Input, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';
import { WowHttpService } from 'src/app/service/wow.http.service';
import { RandomWowSearchComponent } from '../random-wow-search/random-wow-search.component';

@Component({
  selector: 'ordered-wow-search',
  templateUrl: './ordered-wow-search.component.html',
  styleUrls: ['../../app.component.scss', '../search.component.scss', './ordered-wow-search.component.scss']
})
export class OrderedWowSearchComponent implements OnInit {

  wows: Wow[] = [];

  @Input() public startIndex = 0;
  @Input() public endIndex = 0;
  @Input() public useEndIndex = false;

  constructor(private wowHttp: WowHttpService) { }

  ngOnInit(): void {
  }

  submit() {
    let endIndex = (this.useEndIndex) ? this.endIndex : this.startIndex;

    this.wowHttp.getOrdered(this.startIndex, endIndex)
      .subscribe((list) => this.wows = list);
  }

  setEndIndex() {
    if (this.endIndex < this.startIndex) {
      this.endIndex = this.startIndex;
    }
  }

}
