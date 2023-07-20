import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pricing-approvalprocess',
  templateUrl: './pricing-approvalprocess.component.html',
  styleUrls: ['./pricing-approvalprocess.component.scss']
})
export class PricingApprovalprocessComponent implements OnInit{
  selectedValue: string = '';
  dropdownValues: any;
  constructor (
    private spinner:SpinnerService,
    private http:HttpClient
  ){}
  ngOnInit(): void {
    this.loadDropdownValues();
  }

  loadDropdownValues(): void {
    this.http.get(environment.apiURL + 'Pricing/CustomerListinPrice').subscribe(
      (response:any) => {
        this.dropdownValues = response.customers;
        console.log(response, "dropDownValues");
        
      },
      (error) => {
        console.log('Error loading dropdown values:', error);
      }
    );
  }
  onDropdownChange(){

  }

  onSubmit(){

  }

}
