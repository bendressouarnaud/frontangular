import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailnomenclatureComponent } from './detailnomenclature.component';

describe('DetailnomenclatureComponent', () => {
  let component: DetailnomenclatureComponent;
  let fixture: ComponentFixture<DetailnomenclatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailnomenclatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailnomenclatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
