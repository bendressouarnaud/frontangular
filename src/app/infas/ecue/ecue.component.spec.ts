import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcueComponent } from './ecue.component';

describe('EcueComponent', () => {
  let component: EcueComponent;
  let fixture: ComponentFixture<EcueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
