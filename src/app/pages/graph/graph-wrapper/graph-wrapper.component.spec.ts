import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphWrapperComponent } from './graph-wrapper.component';

describe('GraphWrapperComponent', () => {
  let component: GraphWrapperComponent;
  let fixture: ComponentFixture<GraphWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
