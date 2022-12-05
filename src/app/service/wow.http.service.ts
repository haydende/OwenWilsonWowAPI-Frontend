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

    if (results != null) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      console.log(requestUrl);
      requestUrl = `${requestUrl}results=${results}`;
      console.log(requestUrl);
      isFirstParam = false;
    }

    if (year != null) {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      console.log(requestUrl);
      requestUrl = `${requestUrl}year=${year}`;
      console.log(requestUrl);
      isFirstParam = false;
    }

    if (movie != "") {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      console.log(requestUrl);
      requestUrl = `${requestUrl}movie=${movie}`;
      console.log(requestUrl);
      isFirstParam = false;
    }

    if (director != "") {
      requestUrl = requestUrl + ((isFirstParam) ? "?" : "&");
      console.log(requestUrl);
      requestUrl = `${requestUrl}director=${director}`;
      console.log(requestUrl);
      isFirstParam = false;
    }

    console.log(`Sending request to ${requestUrl}`);
    return this.httpClient.get<Wow[]>(requestUrl);
  }

  public getOrdered(startIndex: number, endIndex?: number): Observable<Wow[]> {
    let requestUrl = `${this.urlBase}/ordered/${startIndex}`;

    if (null != endIndex && endIndex >= startIndex) {
      requestUrl = `${requestUrl}-${endIndex}`;
    } else {
      requestUrl = `${requestUrl}-${startIndex}`; // force API to response with array
    }

    console.log(`Sending request to ${requestUrl}`);
    return this.httpClient.get<Wow[]>(requestUrl);

  }

  public getMovieNames(): Observable<string[]>{
    let requestUrl = `${this.urlBase}/movies`;
    console.log(`Sending request to ${requestUrl}`);
    return this.httpClient.get<string[]>(requestUrl);
  }

  public getDirectorNames(): Observable<string[]> {
    let requestUrl = `${this.urlBase}/directors`;
    console.log(`Sending request to ${requestUrl}`);
    return this.httpClient.get<string[]>(requestUrl);
  }

}
