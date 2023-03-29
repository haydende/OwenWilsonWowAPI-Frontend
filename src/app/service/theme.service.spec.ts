import { ThemeService } from "./theme.service";
import { Setting, SettingLocalStorageService } from "./setting-storage.service";

describe('ThemeService', () => {

  describe('Unit Tests', () => {
    let service: ThemeService;
    let settingStorageService: SettingLocalStorageService;

    let initService = () => {
      service = new ThemeService(document, settingStorageService);
    }

    beforeEach(() => {
      settingStorageService = new SettingLocalStorageService();
    })

    afterEach(() => {
      localStorage.setItem(Setting.THEME, "");
    })

    it('should create', () => {
      initService();
      expect(service).toBeTruthy();
    })
  })
})
