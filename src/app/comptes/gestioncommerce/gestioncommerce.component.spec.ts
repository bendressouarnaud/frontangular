import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncommerceComponent } from './gestioncommerce.component';

describe('GestioncommerceComponent', () => {
  let component: GestioncommerceComponent;
  let fixture: ComponentFixture<GestioncommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioncommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioncommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
