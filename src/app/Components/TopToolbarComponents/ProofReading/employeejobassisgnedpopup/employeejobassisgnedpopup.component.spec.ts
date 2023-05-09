import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeejobassisgnedpopupComponent } from './employeejobassisgnedpopup.component';

describe('EmployeejobassisgnedpopupComponent', () => {
  let component: EmployeejobassisgnedpopupComponent;
  let fixture: ComponentFixture<EmployeejobassisgnedpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeejobassisgnedpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeejobassisgnedpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
