import { ComponentFixture, TestBed } from '@angular/core/testing';

import RandomWowComponent from './random-wow.component';

describe('RandomWowComponent', () => {
  let component: RandomWowComponent;
  let fixture: ComponentFixture<RandomWowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomWowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomWowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
