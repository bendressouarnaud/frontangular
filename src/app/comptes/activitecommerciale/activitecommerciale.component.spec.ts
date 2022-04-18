import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitecommercialeComponent } from './activitecommerciale.component';

describe('ActivitecommercialeComponent', () => {
  let component: ActivitecommercialeComponent;
  let fixture: ComponentFixture<ActivitecommercialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitecommercialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitecommercialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
