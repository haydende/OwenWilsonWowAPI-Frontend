import { Component, Input, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';
import { WowHttpService } from 'src/app/service/wow.http.service';
import {NOT_APPLICABLE} from "../../constants";

@Component({
  selector: 'random-wow-search',
  templateUrl: './random-wow-search.component.html',
  styleUrls: ['../../app.component.scss', '../search.component.scss']
})
export class RandomWowSearchComponent implements OnInit {

  directorNames: string[] = [NOT_APPLICABLE];
  movieNames: string[] = [NOT_APPLICABLE];
  hasSubmitted: boolean = false;
  wows: Wow[] = [];
  error: any = null;

  @Input() public results: number | null = 5;
  @Input() public year: number | null = 2000;
  @Input() public movieName: string | null = this.movieNames[0];
  @Input() public directorName: string | null = this.directorNames[0];

  constructor(private wowService: WowHttpService) {
    this.wowService.getMovieNames()
      .subscribe((movieNames) => this.movieNames = this.movieNames.concat(movieNames));
    console.debug(`Movies names received: ${this.movieNames}`);

    this.wowService.getDirectorNames()
      .subscribe((directorNames) => this.directorNames = this.directorNames.concat(directorNames));
    console.debug(`Director names received: ${this.directorNames}`);
  }

  ngOnInit(): void {
    this.movieName = this.movieNames[0];
    this.directorName = this.directorNames[0];
  }

  submit(): void {
    console.debug(`Searching for Wows with criterion: Count: [${this.results}], Year of release: [${this.year}], Movie title: [${this.movieName}] and Director Name: [${this.directorName}]`);
    this.wowService.getRandom(this.results, this.year, this.movieName, this.directorName)
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

}
