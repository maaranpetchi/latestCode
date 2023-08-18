
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { PopupinvoiceComponent } from '../popupinvoice/popupinvoice.component';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  clientId: any;


  constructor(private http: HttpClient, private _empService: PricingcalculationService, private dialog: MatDialog,private spinnerService:SpinnerService,@Inject(MAT_DIALOG_DATA)

  public data1: any,) { console.log(data1,"InjectedData");}
  ngOnInit(): void {

  }

}
