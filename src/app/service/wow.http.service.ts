import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wow } from '../model/wow';
import { Observable } from 'rxjs';

@Injectable()
export class WowHttpService {

  private readonly urlBase: string = "https://owen-wilson-wow-api.onrender.com/wows"

  constructor(private httpClient: HttpClient) { }

  public getRandom(
    results: number = 5,
    year?: number,
    movie?: string,
    director?: string
  ): Observable<Wow[]> {
    let requestUrl = `${this.urlBase}/random`;
    let isFirstParam = true;

    if (results != null || results != undefined ) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      requestUrl = `${requestUrl}results=${results}`;
      isFirstParam = false;
    }

    if (year != null || year != undefined) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      requestUrl = `${requestUrl}year=${year}`;
      isFirstParam = false;
    }

    if (movie != null || movie != undefined) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      requestUrl = `${requestUrl}movie=${movie}`;
      isFirstParam = false;
    }

    if (director != null || director != undefined) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      requestUrl = `${requestUrl}director=${director}`;
    }

    console.debug(`Sending request to ${requestUrl}`);
    return this.httpClient.get<Wow[]>(requestUrl);
  }

  public getOrdered(startIndex: number, endIndex?: number): Observable<Wow[]> {
    let requestUrl = `${this.urlBase}/ordered/${startIndex}`;

    if (null != endIndex && endIndex >= startIndex) {
      requestUrl = `${requestUrl}-${endIndex}`;
    } else {
      requestUrl = `${requestUrl}-${startIndex}`; // force API to respond with array
    }

    console.debug(`Sending request to ${requestUrl}`);
    return this.httpClient.get<Wow[]>(requestUrl);

  }

  public getMovieNames(): Observable<string[]>{
    let requestUrl = `${this.urlBase}/movies`;
    console.debug(`Sending request to ${requestUrl}`);
    return this.httpClient.get<string[]>(requestUrl);
  }

  public getDirectorNames(): Observable<string[]> {
    let requestUrl = `${this.urlBase}/directors`;
    console.debug(`Sending request to ${requestUrl}`);
    return this.httpClient.get<string[]>(requestUrl);
  }

}
