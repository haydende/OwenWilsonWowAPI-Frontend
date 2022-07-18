import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempWowComponent } from './temp-wow.component';

describe('TempWowComponent', () => {
  let component: TempWowComponent;
  let fixture: ComponentFixture<TempWowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempWowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempWowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
