import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientorderstableComponent } from '../clientorderstable.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface TableData {
  fileName: string;
  poNo: string;
  poDate: string;
  instruction: string;
  salesPersonName: string;
  transactionType: string;
  division: string;
}

@Component({
  selector: 'app-fileconvert',
  templateUrl: './fileconvert.component.html',
  styleUrls: ['./fileconvert.component.scss']
})
export class FileconvertComponent implements OnInit {
  displayedColumns: string[] = [
    'fileName',
    'poNo',
    'poDate',
    'instruction',
    'salesPersonName',
    'transactionType',
    'division'
  ];
  dataSource = new MatTableDataSource<TableData>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;

  constructor(private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) {console.log(data,"data");
    this.gettingdata(data);

    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDataFromAPI();
  }

  fetchDataFromAPI() {
    // Replace 'API_URL' with the actual URL of your REST API
    this.http.get<TableData[]>('API_URL').subscribe(data => {
      this.dataSource.data = data;
    });
  }

gettingdata(data:any){
  console.log(data,"filedata");
  
let a:any[] = [];
let GetAllvalues= data.row;
let count= data.fileCount;
for (let i = 0; i < count; i++) {
 
 
  let GetAddList =
  {
      FileName:GetAllvalues.fileName,
      PoNo:GetAllvalues.poNo,
      PODate:GetAllvalues.poDate,
      Remarks:GetAllvalues.instruction,
      SalesPersonName:GetAllvalues.salesPersonName,
      JobStatusId:GetAllvalues.jobStatusId,
      TransactionId:GetAllvalues.transactionType,
      DepartmentId:GetAllvalues.workType,
      ClientId:GetAllvalues.clientId,
      EmployeeId:152,
      FileReceivedDate:GetAllvalues.fileReceivedDate,
      ClientOrderId:GetAllvalues.orderId,
      CCId:GetAllvalues.ccId,//
      CCEmailId:GetAllvalues.ccEmailId,//
      FileInwardTypeId:GetAllvalues.fileInwardTypeId,//
      DivisionId:this.ClientorderstableComponent.getselecteddivisions(),// //
      getAllValues:[],
      ApparelLogoLocation:'apparel',
      poNo: "string",
      clientName: "string",
      clientJobId: "string",
      jobStatusDescription: "string",
      username: "string",
      clientSalesPerson: "string",
      customerName: "string",
      temp: "string",
      style: "string",
      projectCode: "string",
      teamCode: "string",
      schoolName: "string",
      ground: "string",
      gender: "string",
      fileInwardMode: "string",
      jobDescription: "string",
      color: "string",
      logoDimensionWidth: "string",
      logoDimensionsLength: "string",
      apparelLogoLocation: "string",
      imprintColors1: "string",
      imprintColors2: "string",
      imprintColors3: "string",
      virtualProof: "string",
    
      customerJobType: "string",
     
viewDatas:[],
      
  }
  a.push(
    GetAddList
  );
this.dataSource = new MatTableDataSource(a)
}
}





}