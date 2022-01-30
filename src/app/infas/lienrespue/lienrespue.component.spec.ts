import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienrespueComponent } from './lienrespue.component';

describe('LienrespueComponent', () => {
  let component: LienrespueComponent;
  let fixture: ComponentFixture<LienrespueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LienrespueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LienrespueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
