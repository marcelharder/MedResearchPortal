import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsThreeComponent } from './details-three.component';

describe('DetailsThreeComponent', () => {
  let component: DetailsThreeComponent;
  let fixture: ComponentFixture<DetailsThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
