import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTwoComponent } from './details-two.component';

describe('DetailsTwoComponent', () => {
  let component: DetailsTwoComponent;
  let fixture: ComponentFixture<DetailsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
