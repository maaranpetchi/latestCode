import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofReadingAllocationComponent } from './proof-reading-allocation.component';

describe('ProofReadingAllocationComponent', () => {
  let component: ProofReadingAllocationComponent;
  let fixture: ComponentFixture<ProofReadingAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofReadingAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofReadingAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
