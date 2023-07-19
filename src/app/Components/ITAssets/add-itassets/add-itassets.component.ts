import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-itassets',
  templateUrl: './add-itassets.component.html',
  styleUrls: ['./add-itassets.component.scss']
})
export class AddItassetsComponent implements OnInit {
  hardwareStepFormGroup: FormGroup;
  softwareStepFormGroup: FormGroup;
  
  ngOnInit(): void {
  
  }
//NgModel to save the values
  Type:number;
  BayNo: string; 
  Location: string; 
  baynodisable: boolean; 


  PcName: string; 
  PcType: any; 
  HardwareData: any[] = [];
  PcTypeV: any;

  Monitor: string; 
  MonitorSno: string; 
  keyboard: string;
  keyboardSno: string;

  Roll: string; 
  Division: string;

  Brand: string;
  Model: string;

  WarrantyDetails: string; 
  RAM: string;

  Processor: string;
  Graphics: string;
 
  HDD: string; 
  TAGNumber: string;

  MacAddress: string; 
  OS: string;

  IPAddress: string; 
  ServerType: any; 
  GetSTD: any[] =[];
  ServerTypeV: any;

  InvoiceDate: Date; 
  InvoiceNumber: string;
  Mouse: string; 
  MouseSNO: string; 
  WorkingStatus: any; 
  GetWSD: any[] = [];
  WorkingStatusV: any;
//NgModel to save the values


//Form 

}
