import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasupComponent } from './agendasup.component';

describe('AgendasupComponent', () => {
  let component: AgendasupComponent;
  let fixture: ComponentFixture<AgendasupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendasupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
