import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Theme } from "../model/theme.model";
import { SettingLocalStorageService, Setting } from "./setting-storage.service";


@Injectable()
export class ThemeService {
    
    private currentTheme: Theme = Theme.DARK;
    
    private themeChangedSubject = new BehaviorSubject(this.currentTheme);

    themeChanged$: Observable<Theme>;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private settingStorage: SettingLocalStorageService
    ) {
        this.themeChanged$ = this.themeChangedSubject.asObservable();
        this.init();
    }

    private updateCurrentTheme(theme: Theme) {
        this.currentTheme = theme;
        this.themeChangedSubject.next(this.currentTheme);
        this.settingStorage.saveSetting(Setting.THEME, this.currentTheme);
    }

    private init() {
        const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
        let initTheme = <Theme> this.settingStorage.getSetting(Setting.THEME);
        if (!initTheme) {
            deviceTheme.matches ? (initTheme = Theme.DARK) : (initTheme = Theme.LIGHT);
        }
        this.updateCurrentTheme(initTheme);
        this.document.body.classList.add(this.currentTheme.toLowerCase());
    }

    applyTheme(theme: Theme) {
        this.document.body.classList.toggle(this.currentTheme.toLowerCase());
        this.document.body.classList.toggle(theme.toLowerCase());
        this.updateCurrentTheme(theme);
    }

}