import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigmotifComponent } from './configmotif.component';

describe('ConfigmotifComponent', () => {
  let component: ConfigmotifComponent;
  let fixture: ComponentFixture<ConfigmotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigmotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigmotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
