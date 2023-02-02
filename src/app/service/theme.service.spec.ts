import {ThemeService} from "./theme.service";
import {Setting, SettingLocalStorageService} from "./setting-storage.service";
import {Theme} from "../model/theme.model";

describe('ThemeService', () => {
  let service: ThemeService;
  let settingStorageService: SettingLocalStorageService;

  let setTheme = (theme: Theme) => {
    settingStorageService.saveSetting(Setting.THEME, theme);
  }

  let initService = () => {
    service = new ThemeService(document, settingStorageService);
  }

  beforeEach(() => {
    settingStorageService = new SettingLocalStorageService();
  })

  afterEach(() => {
    localStorage.setItem(Setting.THEME, "");
    document.body.classList.forEach((classListItem) => {
      document.body.classList.remove(classListItem);
    })
  })

  it('should create', () => {
    initService();
    expect(service).toBeTruthy();
  })

  it('should default to DARK theme if no theme is saved', () => {
    initService();

    expect(document.body.classList).toContain('dark');

    expect(settingStorageService.getSetting(Setting.THEME)).toEqual(Theme.DARK);
  })

  it('should apply DARK theme if "dark" has been saved in localStorage', () => {
    setTheme(Theme.DARK);
    initService();

    let bodyClassList = document.body.classList;
    console.log(bodyClassList);
    expect(bodyClassList.length).toEqual(1);
    expect(bodyClassList).toContain('dark');
  })

  it('should apply LIGHT theme if "light" has been saved in localStorage', () => {
    setTheme(Theme.LIGHT);
    initService();

    let bodyClassList = document.body.classList;
    expect(bodyClassList.length).toEqual(1);
    expect(bodyClassList).toContain('light');
  })

  it('should default to LIGHT theme if prefers-color-scheme is light', () => {
    // TODO: Find a way to mock prefers-color-scheme CSS Query
  })

})

function initComponents() {

}
