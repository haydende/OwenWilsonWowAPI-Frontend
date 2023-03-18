import {OrderedWowSearchComponent} from "./ordered-wow-search.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../../app.component";
import {WowHttpService} from "../../service/wow.http.service";
import {FormsModule} from "@angular/forms";
import { Wow } from "../../model/wow";
import { of } from "rxjs";
import * as ORDERED_WOW_0_0 from "../../../assets/test/wows/ordered_wow_0_0.json";
import * as ORDERED_WOW_0_2 from "../../../assets/test/wows/ordered_wow_0_2.json";
import * as ORDERED_WOW_2_2 from "../../../assets/test/wows/ordered_wow_2_2.json";


describe('OrderedWowSearchComponent', () => {

  let fixture: ComponentFixture<OrderedWowSearchComponent>;
  let nativeElement: HTMLElement;

  describe('Unit Tests', () => {
    let wowHttpServiceSpy: jasmine.SpyObj<WowHttpService>;

    let component: OrderedWowSearchComponent;
    beforeEach(() => {

      wowHttpServiceSpy = jasmine.createSpyObj('WowHttpService', ['getDirectorNames','getMovieNames','getOrdered']);

      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        declarations: [AppComponent],
        providers: [
          { provide: WowHttpService, useValue: wowHttpServiceSpy },
          FormsModule
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(OrderedWowSearchComponent);
      nativeElement = fixture.nativeElement;
      component = fixture.componentInstance;
    })

    it('should create', () => {
      expect(component).toBeTruthy();
    })

    it('should have the correct default values upon init', () => {
      fixture.autoDetectChanges(true);
      fixture.ngZone!.run(() => {
        const startIndex: number = component.startIndex;
        const endIndex: number = component.endIndex;
        const useEndIndex: boolean = component.useEndIndex;

        expect(startIndex).toEqual(0);
        expect(endIndex).toEqual(0);
        expect(useEndIndex).toBeFalse();
      })
    })

    it('should retrieve/contain the correct Wow when submit button has been clicked', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getOrdered.and.returnValue(of(ORDERED_WOW_0_0 as unknown as Wow[]));
      const expectedWowList: Wow[] = ORDERED_WOW_0_0 as unknown as Wow[];
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      submitButton.click();

      expect(wowHttpServiceSpy.getOrdered).toHaveBeenCalledOnceWith(0, 0);

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(1);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      })
    })

    it('should retrieve/contain the correct Wow when useEndIndex = true, endIndex = 2, submit button has been clicked', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getOrdered.and.returnValue(of(ORDERED_WOW_0_2 as unknown as Wow[]));
      const expectedWowList: Wow[] = ORDERED_WOW_0_2 as unknown as Wow[];
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.useEndIndex = true;
        component.endIndex = 2;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getOrdered).toHaveBeenCalledOnceWith(0, 2);

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(3);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      })
    })

    it('should retrieve/contain the correct Wow when useEndIndex = false, endIndex = 2, submit button has been clicked', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getOrdered.and.returnValue(of(ORDERED_WOW_0_0 as unknown as Wow[]));
      const expectedWowList: Wow[] = ORDERED_WOW_0_0 as unknown as Wow[];
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.useEndIndex = false;
        component.endIndex = 2;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getOrdered).toHaveBeenCalledOnceWith(0, 0);

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(1);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      })
    })

    it('should retrieve/contain the correct Wow when useEndIndex = false, startIndex = 2, endIndex = 0, submit button has been clicked', () => {
      fixture.autoDetectChanges(true);
      wowHttpServiceSpy.getOrdered.and.returnValue(of(ORDERED_WOW_2_2 as unknown as Wow[]));
      const expectedWowList: Wow[] = ORDERED_WOW_2_2 as unknown as Wow[];
      const submitButton = nativeElement.querySelector('#submit-button') as HTMLButtonElement;

      fixture.ngZone!.run(() => {
        component.useEndIndex = false;
        component.startIndex = 2;
        component.endIndex = 0;
      });
      submitButton.click();

      expect(wowHttpServiceSpy.getOrdered).toHaveBeenCalledOnceWith(2, 2);

      fixture.ngZone!.run(() => {
        const wowList = component.wows;
        expect(wowList.length).toEqual(1);
        for (let i = 0; i < wowList.length; i++) {
          expect(wowList[i]).toEqual(expectedWowList[i]);
        }
      })
    })


  })
});
