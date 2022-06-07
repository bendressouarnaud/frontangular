import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatdevisattenteComponent } from './statdevisattente.component';

describe('StatdevisattenteComponent', () => {
  let component: StatdevisattenteComponent;
  let fixture: ComponentFixture<StatdevisattenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatdevisattenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatdevisattenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
