import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { ThemeService } from "../../service/theme.service";
import { SettingLocalStorageService } from "../../service/setting-storage.service";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  describe('Unit Tests', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ SettingsComponent ],
        providers: [
          ThemeService,
          SettingLocalStorageService
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(SettingsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    })
  })

  describe('Integration Tests', () => {

    beforeEach(() => {
      localStorage.removeItem('theme');
    })

    const createTestBed = (): TestBed => {
      return TestBed.configureTestingModule({
          declarations: [ SettingsComponent ],
          providers: [
            ThemeService,
            SettingLocalStorageService
          ]
      })
    }

    it('should default to dark theme, if theme has not been set', () => {
      const testBed = createTestBed()
      const fixture = TestBed.createComponent(SettingsComponent);
      const component = fixture.componentInstance;

      fixture.autoDetectChanges(true);

      testBed.compileComponents();

      fixture.ngZone!.run(() => {
        expect(component.currentTheme).toEqual('Dark');
      })
    })

    it('should apply light theme, if theme has been set to "Light"', () => {
      localStorage.setItem('theme', 'Light');

      const testBedStatic = createTestBed();
      const fixture = TestBed.createComponent(SettingsComponent);
      const component = fixture.componentInstance;
      fixture.autoDetectChanges(true);

      testBedStatic.compileComponents();

      fixture.ngZone!.run(() => {
        expect(component.currentTheme).toEqual('Light');
      })
    })

  })

});
