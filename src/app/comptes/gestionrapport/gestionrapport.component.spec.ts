import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionrapportComponent } from './gestionrapport.component';

describe('GestionrapportComponent', () => {
  let component: GestionrapportComponent;
  let fixture: ComponentFixture<GestionrapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionrapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionrapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
