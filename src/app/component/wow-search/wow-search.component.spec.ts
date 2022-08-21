import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowSearchComponent } from './wow-search.component';

describe('WowSearchComponent', () => {
  let component: WowSearchComponent;
  let fixture: ComponentFixture<WowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
