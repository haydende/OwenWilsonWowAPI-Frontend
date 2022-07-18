import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wow } from './wow';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WowHttpService {

  private readonly urlBase: string = "https://owen-wilson-wow-api.herokuapp.com/wows"

  private response: Wow[] = [];

  constructor(private httpClient: HttpClient) { }

  public getRandom(): Observable<Wow[]> {
    var data: Wow;
    return this.httpClient.get<Wow[]>(`${this.urlBase}/random`);
  }

}
