import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmailComponent } from './getmail.component';

describe('GetmailComponent', () => {
  let component: GetmailComponent;
  let fixture: ComponentFixture<GetmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
