import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapVisualizerComponent } from './leap-visualizer.component';

describe('LeapVisualizerComponent', () => {
  let component: LeapVisualizerComponent;
  let fixture: ComponentFixture<LeapVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeapVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeapVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
