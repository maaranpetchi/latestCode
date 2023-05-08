import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofReadingAllocationTableComponent } from './proof-reading-allocation-table.component';

describe('ProofReadingAllocationTableComponent', () => {
  let component: ProofReadingAllocationTableComponent;
  let fixture: ComponentFixture<ProofReadingAllocationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofReadingAllocationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofReadingAllocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
