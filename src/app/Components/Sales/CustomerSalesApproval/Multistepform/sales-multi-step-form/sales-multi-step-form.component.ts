import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CustomerSalesApprovalService } from 'src/app/Services/sales/CustomerSalesApproval/customer-sales-approval.service';

@Component({
  selector: 'app-sales-multi-step-form',
  templateUrl: './sales-multi-step-form.component.html',
  styleUrls: ['./sales-multi-step-form.component.scss']
})
export class SalesMultiStepFormComponent implements OnInit {
  customerProfile: FormGroup;
  CustomerVsScope: FormGroup;
  customerVsTAT: FormGroup;
  apiResponseData: any;
  CountryId: any;
  timezone: any;
  AppCustomerDetails: any;
  ngOnInit(): void {
    this.apiResponseData = this.sharedDataService.getData();
    console.log(this.apiResponseData, "gettingdatafromindex");
this.fetchUpdateData();
  }
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private _coreService: CoreService, private sharedDataService: CustomerSalesApprovalService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router) {
    this.getCustomerData();
    this.getDepartments();
    this.getCountry();
  }
///fetch update data into ngmodel when edit button clicked
fetchUpdateData(){

this.ShortName = this.apiResponseData.shortName;
  this.CustomerClassificationId = this.apiResponseData.customerClassificationId;
  this.selectedDepartments = this.apiResponseData.selectedDepartments;
  this.CreditDays = this.apiResponseData.creditDays;
  this.CreditLimit = this.apiResponseData.creditLimit;
  this.CustomerJobType = this.apiResponseData.customerJobType;
  this.Country= this.apiResponseData.country;
  this.State =  this.apiResponseData.state;
  this.City = this.apiResponseData.city;
  this.BillingCycleType= this.apiResponseData.billingCycleType;
  this.PaymentMode=this.apiResponseData.paymentMode;
  this.PrivilegedClient=this.apiResponseData.privilegedClient;
  this.InputType =this.apiResponseData.inputType;
  this.OutputType=this.apiResponseData.outputType;
  this.isBulk = this.apiResponseData.isBulk ;
  this.isRushed = this.apiResponseData.isRush ;
  this.manualupload =this.apiResponseData.isManualUpload ;
  this.ScheduledMail =this.apiResponseData.bunchMail ;
  this.Checklist = this.apiResponseData.checklist ;
  this.ModeofSales = this.apiResponseData.modeofSales ;
  this.CurrencyMode =  this.apiResponseData.currencyMode ;
}

  //customerclassification-dropdown
  getCustomerData(): void {
    this.http.get<any>(environment.apiURL + `Customer/GetClassification`).subscribe(
      (data) => {
        this.ClassificationList = data;
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }


  //department dropdown
  getDepartments(): void {
    this.http.get<any>(environment.apiURL + `Customer/getClientDepartment`).subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }


  //Countrydropdown
  getCountry() {
    this.http.get<any>(environment.apiURL + `Customer/GetAllCountryList`).subscribe(results => {
      this.CountriesList = results.countryDetails
      this.CountryId = results.countryDetails.id
    })
  }



  citiesList: any[] = [];
  placeList: any[] = [];
  departments: any[] = [];
  CountriesList: any[] = [];
  ClassificationList: any[] = [];
  //ngmodels to save the current value
  ShortName: '';
  CustomerClassificationId: '';
  selectedDepartments: any[] = [];
  CreditDays: '';
  CreditLimit: '';
  CustomerJobType: '';
  Country: any;
  State = '';
  City = '';
  BillingCycleType='';
  PaymentMode='';
  PrivilegedClient='';
  InputType ='';
  OutputType='';
  isBulk: boolean = false;
  isRushed: boolean = false;
  manualupload: boolean = false;
  ScheduledMail: boolean = false;
  Checklist: boolean = false;
  ModeofSales:any;
  CurrencyMode:any;
  //change method to display state and places realted to country dropdown
  GetStatesList() {
    this.http.get<any>(environment.apiURL + `Customer/GetAllStateListbyCountryId?CountryId=${this.Country}`).subscribe(results => {      
      this.placeList = results;
    });
  }

  GetCitiesList() {
    this.http.get<any>(environment.apiURL + `Customer/GetAllCityListbyStateId?StateId=${this.State}`).subscribe(results => {      
      this.citiesList = results;
    });
  }

  GetTimeZoneList() {
    this.http.get<any>(environment.apiURL + `Customer/GetAllTimeZoneListbyCityId?CityId=${this.City}`).subscribe(results => {      
      this.timezone = results[0].timeZone;
      console.log(results[0].timeZone,"timezone");
      
    });
  }

// getDatecreation(){
//   this.http.get<any>(environment.apiURL+`Customer/getAppCustomerSalesId?CustomerId=${this.apiResponseData.id}`).subscribe( results =>{
//     console.log(results,"date");
    
//     this.AppCustomerDetails = results.createdUTC
//   });
}
