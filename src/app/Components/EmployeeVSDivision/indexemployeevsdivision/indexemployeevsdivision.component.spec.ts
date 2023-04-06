import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexemployeevsdivisionComponent } from './indexemployeevsdivision.component';

describe('IndexemployeevsdivisionComponent', () => {
  let component: IndexemployeevsdivisionComponent;
  let fixture: ComponentFixture<IndexemployeevsdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexemployeevsdivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexemployeevsdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
