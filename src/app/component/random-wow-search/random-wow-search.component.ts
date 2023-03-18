import { Component, Input, OnInit } from '@angular/core';
import { Wow } from 'src/app/model/wow';
import { WowHttpService } from 'src/app/service/wow.http.service';

@Component({
  selector: 'random-wow-search',
  templateUrl: './random-wow-search.component.html',
  styleUrls: ['../../app.component.scss', '../search.component.scss']
})
export class RandomWowSearchComponent implements OnInit {

  wows: Wow[] = [];
  movieNames: string[] = [];
  directorNames: string[] = [];

  @Input() public results: number | null = 5;
  @Input() public year: number | null = 2000;
  @Input() public movieName: string | null = this.movieNames[0];
  @Input() public directorName: string | null = this.directorNames[0];

  constructor(private wowService: WowHttpService) {
    this.wowService.getMovieNames()
      .subscribe((movieNames) => this.movieNames = movieNames);
    console.debug(`Movies names received: ${this.movieNames}`);

    this.wowService.getDirectorNames()
      .subscribe((directorNames) => this.directorNames = directorNames);
    console.debug(`Director names received: ${this.directorNames}`);
  }

  ngOnInit(): void {
    this.movieName = this.movieNames[0];
    this.directorName = this.directorNames[0];
  }

  submit(): void {
    console.debug(`Searching for Wows with criterion: Count: [${this.results}], Year of release: [${this.year}], Movie title: [${this.movieName}] and Director Name: [${this.directorName}]`);
    this.wowService.getRandom(this.results, this.year, this.movieName, this.directorName)
      .subscribe((list) => this.wows = list);
  }

}
