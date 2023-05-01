import { Component, Input } from '@angular/core';
import { Wow } from 'src/app/model/wow';
import { WowHttpService } from 'src/app/service/wow.http.service';

@Component({
  selector: 'ordered-wow-search',
  templateUrl: './ordered-wow-search.component.html',
  styleUrls: ['../../app.component.scss', '../search.component.scss', './ordered-wow-search.component.scss']
})
export class OrderedWowSearchComponent {

  hasSubmitted: boolean = false;
  error: any = null;
  wows: Wow[] = [];

  @Input() public startIndex = 0;
  @Input() public endIndex = 0;
  @Input() public useEndIndex = false;

  constructor(private wowHttp: WowHttpService) { }

  submit() {
    let endIndex = (this.useEndIndex) ? this.endIndex : this.startIndex;

    this.wowHttp.getOrdered(this.startIndex, endIndex)
      .subscribe({
        next: (list) => {
          this.wows = list
          this.error = null;
        },
        error: (error) => {
          this.error = error;
          this.wows = [];
          console.error(error);
        }
      });
    this.hasSubmitted = true;
  }

  setEndIndex() {
    if (this.endIndex < this.startIndex) {
      this.endIndex = this.startIndex;
    }
  }

}
