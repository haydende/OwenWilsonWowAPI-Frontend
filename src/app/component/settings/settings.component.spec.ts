import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { ThemeService } from "../../service/theme.service";
import { SettingLocalStorageService } from "../../service/setting-storage.service";
import { Theme } from "../../model/theme.model";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      providers: [ ThemeService, SettingLocalStorageService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load HTML Template', () => {
    // expect the component to have been created
    expect(component).toBeTruthy();
    let compiled = fixture.nativeElement as HTMLElement;

    // extract the parent div with id 'settings' and assert number of children
    let element = compiled.querySelector('#settings')
    expect(element!.childElementCount).toEqual(2);

    // extract child div 'theme-wrapper' and assert number of children and label text
    element = compiled.querySelector('#theme-wrapper')
    expect(element!.childElementCount).toEqual(2);

    // extract child label and assert text content
    const childLabel = element!.childNodes.item(0);
    expect(childLabel.textContent).toEqual('Theme: ');

    // extract child select element with id 'theme' and assert classList, options
    const childSelector = (compiled.querySelector('#theme') as HTMLSelectElement);
    expect(childSelector).toBeTruthy();

    const expectedThemeSelectorClasses = ['settings-input', 'no-border', 'rounded-corners']
    childSelector?.classList.forEach((classListItem) => {
      expect(expectedThemeSelectorClasses).toContain(classListItem);
    });

    const expectedThemeSelectorOptions = [Theme.DARK.toString(), Theme.LIGHT.toString()];
    const actualThemeSelectorOptions = childSelector.options;
    expect(actualThemeSelectorOptions).toBeTruthy();
    expect(actualThemeSelectorOptions.length).toEqual(expectedThemeSelectorOptions.length);

    for (let i = 0; i < childSelector?.options.length; i++) {
      let optionValue = actualThemeSelectorOptions.item(i);
      expect(expectedThemeSelectorOptions).toContain(optionValue!.value);
    }

    // extract child div 'save-button-wrapper' and assert number of children
    element = (compiled.querySelector('#save-button-wrapper') as HTMLElement);
    expect(element.childElementCount).toEqual(1);

    // extract child button 'save-button' and assert text content
    const saveButton = (compiled.querySelector('#save-button') as HTMLButtonElement);
    expect(saveButton.textContent).toEqual('Save Changes');
  })

  it('should save "light" as the theme in localStorage', () => {
  })
});
