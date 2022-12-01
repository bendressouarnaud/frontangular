import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanteavantageComponent } from './santeavantage.component';

describe('SanteavantageComponent', () => {
  let component: SanteavantageComponent;
  let fixture: ComponentFixture<SanteavantageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanteavantageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanteavantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
