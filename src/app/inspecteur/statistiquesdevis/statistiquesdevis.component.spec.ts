import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesdevisComponent } from './statistiquesdevis.component';

describe('StatistiquesdevisComponent', () => {
  let component: StatistiquesdevisComponent;
  let fixture: ComponentFixture<StatistiquesdevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesdevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesdevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
