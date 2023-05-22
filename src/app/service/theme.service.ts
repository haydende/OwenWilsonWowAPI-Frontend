import {DOCUMENT} from "@angular/common";
import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Theme} from "../model/theme.model";
import {Setting, SettingLocalStorageService} from "./setting-storage.service";

@Injectable()
export class ThemeService {

    private currentTheme: Theme = Theme.DARK;
    private themeChangedSubject = new BehaviorSubject(this.currentTheme);
    themeChanged$: Observable<Theme>;

    constructor(@Inject(DOCUMENT) private document: Document, private settingStorage: SettingLocalStorageService) {
        this.themeChanged$ = this.themeChangedSubject.asObservable();
        this.init();
    }

    public applyTheme(theme: Theme) {
        this.document.body.classList.remove(this.currentTheme.toLowerCase());
        this.document.body.classList.add(theme.toLowerCase());
        this.updateCurrentTheme(theme);
    }

    private updateCurrentTheme(theme: Theme) {
        this.currentTheme = theme;
        this.themeChangedSubject.next(this.currentTheme);
        this.settingStorage.saveSetting(Setting.THEME, this.currentTheme);
    }

    private init() {
        const savedTheme = this.settingStorage.getSetting(Setting.THEME) as Theme;
        const prefersColorSchemeDark = window.matchMedia("(prefers-color-scheme: dark)");

        let themeToApply: Theme;
        if (savedTheme == null) {
          themeToApply = prefersColorSchemeDark ? Theme.DARK : Theme.LIGHT;
        } else themeToApply = savedTheme;

        this.applyTheme(themeToApply);
    }

}
