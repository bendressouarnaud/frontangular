import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilsupComponent } from './accueilsup.component';

describe('AccueilsupComponent', () => {
  let component: AccueilsupComponent;
  let fixture: ComponentFixture<AccueilsupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilsupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
