import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvsupComponent } from './rdvsup.component';

describe('RdvsupComponent', () => {
  let component: RdvsupComponent;
  let fixture: ComponentFixture<RdvsupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvsupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvsupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
