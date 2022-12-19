import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {ThemeService} from "./service/theme.service";
import {SettingLocalStorageService} from "./service/setting-storage.service";

describe('Component: App', () => {

  const title = 'owen-wowson-app';

  describe('Component: App :: Unit Tests', () => { // Question: better way to segregate unit vs IT?

    const fakeThemeService = jasmine.createSpyObj('themeService', ['applyTheme']);
    const underTest = new AppComponent(fakeThemeService);

    it('should have the correct title', () => {
      expect(underTest.title).toEqual(title);
    });

  });

  describe('Component: App :: Integration Tests', () => {

    let fixture: ComponentFixture<AppComponent>;
    let service: ThemeService;
    let underTest: AppComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ AppComponent ],
        providers: [ ThemeService, SettingLocalStorageService ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      service = TestBed.inject(ThemeService);
      underTest = fixture.componentInstance;

    });

    it('should create the app', () => {
      expect(underTest).toBeTruthy();
    });

    it('should render title', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      // expect(compiled.querySelector('.content span')?.textContent).toContain(title);
      // TODO: Implement - title not being set
    });

  });

});
