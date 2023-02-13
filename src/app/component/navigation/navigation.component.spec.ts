import { NavigationComponent } from "./navigation.component";
import { Router } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "../../app.component";

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let mockRouter: Router;
  let fixture: ComponentFixture<NavigationComponent>;


  describe('Unit Tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent],
        providers: []
      })
        .compileComponents();

      fixture = TestBed.createComponent(NavigationComponent);
      mockRouter = TestBed.inject(Router);
      component = new NavigationComponent(mockRouter);
    })

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

    it('should create and load HTML Template', () => {
      expect(component).toBeTruthy();
      let compiled = fixture.nativeElement as HTMLElement;

      // extract the parent div with id 'navigation'
      let element = compiled.querySelector('#navigation') as HTMLDivElement;
      expect(element!.childElementCount).toEqual(3);

      const expectedButtonClassList = ['nav-button']

      // extract child button with text 'random'
      let randomNavButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;
      randomNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(randomNavButton.getAttribute('routerLink')).toEqual('random')
      expect(randomNavButton.textContent).toEqual('Random');

      let orderedNavButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;
      orderedNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(orderedNavButton.getAttribute('routerLink')).toEqual('ordered')
      expect(orderedNavButton.textContent).toEqual('Ordered');

      let settingsNavButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;
      settingsNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(settingsNavButton.getAttribute('routerLink')).toEqual('settings')
      expect(settingsNavButton.textContent).toEqual('Settings');
    })

    it('should highlight the "random" button when the current route is "/random"', () => {
      expect(component).toBeTruthy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('random');
      })

      let compiled = fixture.nativeElement as HTMLElement;

      // extract the parent div with id 'navigation'
      let element = compiled.querySelector('#navigation') as HTMLDivElement;
      expect(element!.childElementCount).toEqual(3);

      const expectedButtonClassList = ['nav-button']
      const expectedHighlightedButtonClassList = ['nav-button', 'current-tab']

      // extract child button with text 'random'
      let randomNavButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;
      randomNavButton.classList.forEach((classListItem) => {
        expect(expectedHighlightedButtonClassList).toContain(classListItem);
      })
      expect(randomNavButton.getAttribute('routerLink')).toEqual('random')
      expect(randomNavButton.textContent).toEqual('Random');

      let orderedNavButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;
      orderedNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(orderedNavButton.getAttribute('routerLink')).toEqual('ordered')
      expect(orderedNavButton.textContent).toEqual('Ordered');

      let settingsNavButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;
      settingsNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(settingsNavButton.getAttribute('routerLink')).toEqual('settings')
      expect(settingsNavButton.textContent).toEqual('Settings');
    })

    it('should highlight the "ordered" button when the current route is "/random"', () => {
      expect(component).toBeTruthy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('ordered');
      })

      let compiled = fixture.nativeElement as HTMLElement;

      // extract the parent div with id 'navigation'
      let element = compiled.querySelector('#navigation') as HTMLDivElement;
      expect(element!.childElementCount).toEqual(3);

      const expectedButtonClassList = ['nav-button']
      const expectedHighlightedButtonClassList = ['nav-button', 'current-tab']

      // extract child button with text 'random'
      let randomNavButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;
      randomNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(randomNavButton.getAttribute('routerLink')).toEqual('random')
      expect(randomNavButton.textContent).toEqual('Random');

      let orderedNavButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;
      orderedNavButton.classList.forEach((classListItem) => {
        expect(expectedHighlightedButtonClassList).toContain(classListItem);
      })
      expect(orderedNavButton.getAttribute('routerLink')).toEqual('ordered')
      expect(orderedNavButton.textContent).toEqual('Ordered');

      let settingsNavButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;
      settingsNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(settingsNavButton.getAttribute('routerLink')).toEqual('settings')
      expect(settingsNavButton.textContent).toEqual('Settings');
    })

    it('should highlight the "settings" button when the current route is "/random"', () => {
      expect(component).toBeTruthy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('settings');
      })

      let compiled = fixture.nativeElement as HTMLElement;

      // extract the parent div with id 'navigation'
      let element = compiled.querySelector('#navigation') as HTMLDivElement;
      expect(element!.childElementCount).toEqual(3);

      const expectedButtonClassList = ['nav-button']
      const expectedHighlightedButtonClassList = ['nav-button', 'current-tab']

      // extract child button with text 'random'
      let randomNavButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;
      randomNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(randomNavButton.getAttribute('routerLink')).toEqual('random')
      expect(randomNavButton.textContent).toEqual('Random');

      let orderedNavButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;
      orderedNavButton.classList.forEach((classListItem) => {
        expect(expectedButtonClassList).toContain(classListItem);
      })
      expect(orderedNavButton.getAttribute('routerLink')).toEqual('ordered')
      expect(orderedNavButton.textContent).toEqual('Ordered');

      let settingsNavButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;
      settingsNavButton.classList.forEach((classListItem) => {
        expect(expectedHighlightedButtonClassList).toContain(classListItem);
      })
      expect(settingsNavButton.getAttribute('routerLink')).toEqual('settings')
      expect(settingsNavButton.textContent).toEqual('Settings');
    })

    it('should not highlight any of the buttons when the current route is "/somethingthatisntmapped"', () => {
      expect(component).toBeTruthy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('somethingthatisntmapped');
      })

      let compiled = fixture.nativeElement as HTMLElement;

      // extract the parent div with id 'navigation'
      let element = compiled.querySelector('#navigation') as HTMLDivElement;
      expect(element!.childElementCount).toEqual(3);

      const expectedButtonClassList = ['nav-button']

      // extract child button with text 'random'
      let randomNavButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;
      expect(randomNavButton.classList.length).toEqual(expectedButtonClassList.length);
      expectedButtonClassList.forEach((classListItem) => {
        expect(randomNavButton.classList).toContain(classListItem);
      })
      expect(randomNavButton.getAttribute('routerLink')).toEqual('random')
      expect(randomNavButton.textContent).toEqual('Random');

      let orderedNavButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;
      expect(orderedNavButton.classList.length).toEqual(expectedButtonClassList.length);
      expectedButtonClassList.forEach((classListItem) => {
        expect(orderedNavButton.classList).toContain(classListItem);
      })
      expect(orderedNavButton.getAttribute('routerLink')).toEqual('ordered')
      expect(orderedNavButton.textContent).toEqual('Ordered');

      let settingsNavButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;
      expect(settingsNavButton.classList.length).toEqual(expectedButtonClassList.length);
      expectedButtonClassList.forEach((classListItem) => {
        expect(settingsNavButton.classList).toContain(classListItem);
      })
      expect(settingsNavButton.getAttribute('routerLink')).toEqual('settings')
      expect(settingsNavButton.textContent).toEqual('Settings');
    })


    it('should highlight the "Random" button when it has been clicked', () => {
      expect(component).toBeTruthy();

      let compiled = fixture.debugElement.nativeElement as HTMLElement;
      let randomButton = compiled.querySelector('#random-nav-button') as HTMLButtonElement;

      expect(randomButton.classList.contains('current-tab')).toBeFalsy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('settings');
        randomButton.click();
      })

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(randomButton.classList.contains('current-tab')).toBeTruthy();
        expect(mockRouter.url).toEqual('random');
      })
    })

    it('should highlight the "Ordered" button when it has been clicked', () => {
      expect(component).toBeTruthy();

      let compiled = fixture.debugElement.nativeElement as HTMLElement;
      let orderedButton = compiled.querySelector('#ordered-nav-button') as HTMLButtonElement;

      expect(orderedButton.classList.contains('current-tab')).toBeFalsy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('random');
        orderedButton.click();
      })

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(orderedButton.classList.contains('current-tab')).toBeTruthy();
        expect(mockRouter.url).toEqual('ordered');
      })
    })

    it('should highlight the "Settings" button when it has been clicked', () => {
      expect(component).toBeTruthy();

      let compiled = fixture.debugElement.nativeElement as HTMLElement;
      let settingsButton = compiled.querySelector('#settings-nav-button') as HTMLButtonElement;

      expect(settingsButton.classList.contains('current-tab')).toBeFalsy();

      fixture.ngZone?.run(() => {
        mockRouter.navigateByUrl('ordered');
        settingsButton.click();
      })

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(settingsButton.classList.contains('current-tab')).toBeTruthy();
        expect(mockRouter.url).toEqual('settings');
      })
    })
  })
})
