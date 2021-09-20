import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOneComponent } from './details-one.component';

describe('DetailsOneComponent', () => {
  let component: DetailsOneComponent;
  let fixture: ComponentFixture<DetailsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
