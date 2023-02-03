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
  movieNames: string[] = ["Meet the Parents"];
  directorNames: string[] = ["Jay Roach"];

  @Input() public results = 5;
  @Input() public year = 2000;
  @Input() public movieName = "Meet the Parents";
  @Input() public directorName = "Jay Roach"

  constructor(private wowService: WowHttpService) {
    this.wowService.getMovieNames()
      .subscribe((movieNames) => this.movieNames = movieNames);
    console.debug(`Movies names received: ${this.movieNames}`);

    this.wowService.getDirectorNames()
      .subscribe((directorNames) => this.directorNames = directorNames);
    console.debug(`Director names receieved: ${this.directorNames}`);
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.debug(`Searching for Wows with criterion: Count: ${this.results}, Year of release: ${this.year}, Movie title: ${this.movieName}`);
    this.wowService.getRandom(this.results, this.year, this.movieName, this.directorName)
      .subscribe((list) => this.wows = list);
  }

}
