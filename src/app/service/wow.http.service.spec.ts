import {ComponentFixture, TestBed, inject, waitForAsync} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { WowHttpService } from "./wow.http.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

describe('WowHttpService', () => {
  let service: WowHttpService;
  let de: DebugElement
  let mockHttpClient: HttpClient

  beforeEach(() => {

    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get'])
    service = new WowHttpService(mockHttpClient);

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  })

  it('should correctly build the url and params when only the results count is provided', () => {
    let observable = service.getRandom(6);

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count and year are provided', () => {
    let observable = service.getRandom(6, 2001);

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&year=2001"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count, year and movie name are provided', () => {
    let observable = service.getRandom(6, 2001, 'Movie Name');

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&year=2001&movie=Movie Name"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count, year, movie name and director name are provided', () => {
    let observable = service.getRandom(6, 2001, 'Movie Name', 'Director Name');

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&year=2001&movie=Movie Name&director=Director Name"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count and movie name are provided', () => {
    let observable = service.getRandom(6, undefined, 'Movie Name');

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&movie=Movie Name"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count, movie name and director name are provided', () => {
    let observable = service.getRandom(6, undefined, 'Movie Name', 'Director Name');

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&movie=Movie Name&director=Director Name"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })

  it('should correctly build the url and params when the results count and director name are provided', () => {
    let observable = service.getRandom(6, undefined, 'Movie Name', 'Director Name');

    let expectedUrl = "https://owen-wilson-wow-api.onrender.com/wows/random?results=6&movie=Movie Name&director=Director Name"

    expect(mockHttpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
  })
})
