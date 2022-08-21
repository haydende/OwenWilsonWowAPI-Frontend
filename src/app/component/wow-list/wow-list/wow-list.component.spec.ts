import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowListComponent } from './wow-list.component';

describe('WowListComponent', () => {
  let component: WowListComponent;
  let fixture: ComponentFixture<WowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
