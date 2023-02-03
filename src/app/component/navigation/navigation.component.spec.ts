import { NavigationComponent } from "./navigation.component";
import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "../../app.component";

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      providers: [ ]
    })


    mockRouter = TestBed.inject(Router);
    component = new NavigationComponent(mockRouter);
  })

  describe('Unit Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    })

    it('should return true when isCurrentPath is called with "/random" when path is "/random"', () => {
        spyOnProperty(mockRouter, 'url').and.returnValue('/random');
        expect(component.isCurrentPath("/random")).toBeTruthy();
    })

    it('should return true when isCurrentPath is called with "/ordered" when path is "/ordered"', () => {
        spyOnProperty(mockRouter, 'url').and.returnValue('/ordered');
        expect(component.isCurrentPath('/ordered')).toBeTruthy();
    })

    it('should return true when isCurrentPath is called with "/settings" when path is "/settings"', () => {
        spyOnProperty(mockRouter, 'url').and.returnValue('/settings');
        expect(component.isCurrentPath('/settings')).toBeTruthy();
    })

    it('should return false when isCurrentPath is called with "/settings" when path is "/random"', () => {
        spyOnProperty(mockRouter, 'url').and.returnValue('/random');
        expect(component.isCurrentPath('/settings')).toBeFalsy();
    })
  })
})
