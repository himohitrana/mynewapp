import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesTableComponent } from './races-table.component';

describe('RacesTableComponent', () => {
  let component: RacesTableComponent;
  let fixture: ComponentFixture<RacesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
