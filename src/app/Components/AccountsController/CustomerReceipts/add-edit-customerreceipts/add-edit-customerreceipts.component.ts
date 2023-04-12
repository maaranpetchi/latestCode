import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-customerreceipts',
  templateUrl: './add-edit-customerreceipts.component.html',
  styleUrls: ['./add-edit-customerreceipts.component.scss']
})
export class AddEditCustomerreceiptsComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      vouchernumber: [{value: 0, disabled: true}],
      voucherdate: ['', Validators.required],
      referencenumber: ['', Validators.required],
      referencedate: ['', Validators.required],

    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      console.log(formValue); // Do something with the form value
    }
  }
}
