import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { AppComponent } from "../../app.component";
import { RandomWowSearchComponent } from "./random-wow-search.component";
import { WowHttpService } from "../../service/wow.http.service";
import { Wow } from "../../model/wow";
import * as RANDOM_WOW_2_2000_MOVIENAME1_DIRECTORNAME1 from "../../../assets/test/wows/random_wow_2__2000_MovieName1_DirectorName1_0.json";
import * as RANDOM_WOW_5_1977_MOVIENAME1_DIRECTORNAME1 from "../../../assets/test/wows/random_wow_5_1977_MovieName1_DirectorName1_0.json";
import * as RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME1 from "../../../assets/test/wows/random_wow_5_2000_MovieName1_DirectorName1_0.json";
import * as RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME2 from "../../../assets/test/wows/random_wow_5_2000_MovieName1_DirectorName2_0.json";
import * as RANDOM_WOW_5_2000_MOVIENAME2_DIRECTORNAME1 from "../../../assets/test/wows/random_wow_5_2000_MovieName2_DirectorName1_0.json";
import * as RANDOM_WOW_1_2000_MOVIENAME1_DIRECTORNAME1 from "../../../assets/test/wows/random_wow_1_2000_MovieName1_DirectorName1_0.json";

describe('RandomWowSearchComponent', () => {

  let fixture: ComponentFixture<RandomWowSearchComponent>;
  let nativeElement: HTMLElement;

  describe('Unit Tests', () => {
    let wowHttpServiceSpy: jasmine.SpyObj<WowHttpService>;

    let component: RandomWowSearchComponent;
    beforeEach(() => {

      wowHttpServiceSpy = jasmine.createSpyObj('WowHttpService', ['getDirectorNames','getMovieNames','getRandom'])
      wowHttpServiceSpy.getMovieNames.and.returnValue(of(['Movie Name 1', 'Movie Name 2']))
      wowHttpServiceSpy.getDirectorNames.and.returnValue(of(['Director Name 1', 'Director Name 2']))

      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        declarations: [AppComponent],
        providers: [
          { provide: WowHttpService, useValue: wowHttpServiceSpy },
          FormsModule
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(RandomWowSearchComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;
    })

    it('should create', () => {
      expect(component).toBeTruthy();
    })

    it('should have the correct default values upon init', () => {
      fixture.autoDetectChanges(true);
      fixture.ngZone!.run(() => {
        const results = component.results;
        const year = component.year;
        const movieName = component.movieName;
        const directorName = component.directorName;

        expect(results).toEqual(5);
        expect(year).toEqual(2000);
        expect(movieName).toEqual('Movie Name 1');
        expect(directorName).toEqual('Director Name 1');
      })
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 2000, 'Movie Name 1', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, after results count has changed', () => {
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_2_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_2_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;
      fixture.autoDetectChanges(true);

      fixture.ngZone!.run(() => {
        component.results = 2;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        2, 2000, 'Movie Name 1', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(2);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, after year has changed', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_1977_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_1977_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.year = 1977;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 1977, 'Movie Name 1', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, after movie name has changed', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_2000_MOVIENAME2_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_2000_MOVIENAME2_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.movieName = 'Movie Name 2';
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 2000, 'Movie Name 2', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, after director name has changed', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME2 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME2 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.directorName = 'Director Name 2';
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 2000, 'Movie Name 1', 'Director Name 2'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, and director name is null', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.directorName = null;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 2000, 'Movie Name 1', null
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, and movie name is null', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_2000_MOVIENAME2_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_2000_MOVIENAME2_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.movieName = null;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, 2000, null, 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, and year is null', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_5_1977_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_5_1977_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.year = null;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        5, null, 'Movie Name 1', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(5);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })

    it('should retrieve/contain the correct Wows when submit button has been clicked, and results is null', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getRandom.and.returnValue(of(RANDOM_WOW_1_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]));
      const expectedWowList: Wow[] = RANDOM_WOW_1_2000_MOVIENAME1_DIRECTORNAME1 as unknown as Wow[]
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.results = null;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getRandom).toHaveBeenCalledOnceWith(
        null, 2000, 'Movie Name 1', 'Director Name 1'
      );

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(1);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      });
    })


  });
})
