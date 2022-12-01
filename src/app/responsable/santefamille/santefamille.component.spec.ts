import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantefamilleComponent } from './santefamille.component';

describe('SantefamilleComponent', () => {
  let component: SantefamilleComponent;
  let fixture: ComponentFixture<SantefamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SantefamilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SantefamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
