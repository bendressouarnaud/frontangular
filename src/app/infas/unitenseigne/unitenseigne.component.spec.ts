import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitenseigneComponent } from './unitenseigne.component';

describe('UnitenseigneComponent', () => {
  let component: UnitenseigneComponent;
  let fixture: ComponentFixture<UnitenseigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitenseigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitenseigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
