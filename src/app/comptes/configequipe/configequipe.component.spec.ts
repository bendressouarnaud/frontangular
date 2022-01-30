import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigequipeComponent } from './configequipe.component';

describe('ConfigequipeComponent', () => {
  let component: ConfigequipeComponent;
  let fixture: ComponentFixture<ConfigequipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigequipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigequipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
