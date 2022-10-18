import { Injectable } from "@angular/core";

export enum Setting {
    THEME = "theme"
}

@Injectable()
export class SettingLocalStorageService {

    saveSetting(settingName: string, value: string) {
        localStorage.setItem(settingName, value);
    }

    getSetting(settingName: string) {
        return localStorage.getItem(settingName);
    }

}