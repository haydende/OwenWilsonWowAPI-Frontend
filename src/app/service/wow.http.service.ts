import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wow } from '../model/wow';
import { Observable } from 'rxjs';

@Injectable()
export class WowHttpService {

  private readonly urlBase: string = "https://owen-wilson-wow-api.herokuapp.com/wows"

  constructor(private httpClient: HttpClient) { }

  public getRandom(): Observable<Wow[]> {
    return this.httpClient.get<Wow[]>(`${this.urlBase}/random?results=5`);
  }

}
