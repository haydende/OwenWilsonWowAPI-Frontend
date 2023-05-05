import { Component, Input } from '@angular/core';
import { Wow } from 'src/app/model/wow';

@Component({
  selector: 'wow',
  templateUrl: './wow.component.html',
  styleUrls: ['./wow.component.scss']
})
export class WowComponent {

  @Input() wow: Wow = new Wow();

}
