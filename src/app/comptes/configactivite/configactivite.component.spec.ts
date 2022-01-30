import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigactiviteComponent } from './configactivite.component';

describe('ConfigactiviteComponent', () => {
  let component: ConfigactiviteComponent;
  let fixture: ComponentFixture<ConfigactiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigactiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigactiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
