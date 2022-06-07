import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatdevisequipeComponent } from './statdevisequipe.component';

describe('StatdevisequipeComponent', () => {
  let component: StatdevisequipeComponent;
  let fixture: ComponentFixture<StatdevisequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatdevisequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatdevisequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
