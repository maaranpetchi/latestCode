import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FileconvertComponent } from './fileconvert/fileconvert.component';
import { ClientdetailspopupComponent } from '../clientdetailspopup/clientdetailspopup.component';
@Component({
  selector: 'app-clientorderstable',
  templateUrl: './clientorderstable.component.html',
  styleUrls: ['./clientorderstable.component.scss']
})
export class ClientorderstableComponent {

  
  @ViewChild('popupComponent') popupComponent: ElementRef;
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  
  DivisionApiData: any[];
  selectdivision:number=0;

  displayedColumns: string[] = [
    'selected',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileReceivedEstDate',
    'department',
    'quoteparentid',
    'instruction',
    'salespersonname',
    'transactiontype',
    'action',
    'filecount'
  ];

  visibility(){
    let result:string[]= [];
    if(this.displayedColumnsvisibility.selected){
      result.push('selected');
    }
  
    if(this.displayedColumnsvisibility.client){
      result.push('client');
    }
    if(this.displayedColumnsvisibility.customerSatisfaction){
      result.push('customerSatisfaction');
    }
    if(this.displayedColumnsvisibility.fileName){
      result.push('fileName');
    }
    if(this.displayedColumnsvisibility.fileReceivedEstDate){
      result.push('fileReceivedEstDate');
    }
    if(this.displayedColumnsvisibility.department){
      result.push('department');
    }
    if(this.displayedColumnsvisibility.quoteparentid){
      result.push('quoteparentid');
    }
    if(this.displayedColumnsvisibility.instruction){
      result.push('instruction');
    }
    if(this.displayedColumnsvisibility.salespersonname){
      result.push('salespersonname');
    }
    if(this.displayedColumnsvisibility.transactiontype){
      result.push('transactiontype');
    }
    if(this.displayedColumnsvisibility.action){
      result.push('action');
    }
    if(this.displayedColumnsvisibility.filecount){
      result.push('filecount');
    }
    return result;
  }


  displayedColumnsvisibility: any= {
    'selected':true,
    'client':true,
    'customerSatisfaction':true,
    'fileName':true,
    'fileReceivedEstDate':true,
    'department':true,
    'quoteparentid':true,
    'instruction':true,
    'salespersonname':true,
    'transactiontype':true,
    'action':true,
    'filecount':true,
  };
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    // //DivisionApiDatadropdown
    this.fetchdivision();

    this.bindingjobs();
  }

  fetchdivision() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/nGetDivisionForJO').subscribe(data => {
      this.DivisionApiData = data;
    });
  }




  //to save the checkbox values
  selectedproduction: any[] = [];
  setAll(completed: boolean, item: any) {

    console.log("before", this.selectedproduction)
    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedproduction)
  }

  //   OrdersFactory.GetAllClientOrders('ClientOrdersExts', 1).$promise.then(function (result) {
  //    gridClientOrder.data = result.Data;
  //    NewJobCount =gridClientOrder.data.length;
  // });




  bindingjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/1').subscribe(binddata => {
      this.dataSource = binddata.data;
      this.displayedColumnsvisibility.fileCount = true;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    });
  }
  quotationjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/2').subscribe(quotation => {
      this.dataSource = new MatTableDataSource(quotation.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    });
  }
  convertedjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/3').subscribe(converted => {
      this.dataSource = new MatTableDataSource(converted.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
  deletedjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/4').subscribe(deleted => {
      this.dataSource = new MatTableDataSource(deleted.data)
      this.displayedColumnsvisibility.filecount = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
  quotenotapprovaljobs(){
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/5').subscribe(quotenotapproval => {
      this.displayedColumnsvisibility.filecount = false;  
    this.dataSource = new MatTableDataSource(quotenotapproval.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(quotenotapproval.data,"QUotanotapproval")
    });
  }
  queryforsp(){
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/6').subscribe(queryforsp => {
      this.displayedColumnsvisibility.filecount = false;
    this.dataSource = new MatTableDataSource(queryforsp.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }


  tab(action) {
    if (action == '1') {
      this.bindingjobs();
    }
    else if (action == '2') {
      this.quotationjobs();
    }
    else if (action == '3') {
      this.convertedjobs();
    }
    else if (action == '4') {
      this.deletedjobs();
    }
    else if (action == '5') {
      this.quotenotapprovaljobs();
    }
    else if (action == '6') {
      this.queryforsp();
    }

  }

  fileCount:number;

  openPopup(fileCount,row) {
    // Create an instance of the dialog component
    const dialogRef = this.dialog.open(FileconvertComponent, {
      width:'100vw',
      data: {
        fileCount: fileCount, row : row, divisionid: this.selectdivision
      }
    });

    // Subscribe to the afterClosed event to handle dialog close actions
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed, if needed
    });
  }

  handleKeyPress(event: KeyboardEvent,job:any) {
    const enteredNumber = (event.target as HTMLInputElement).value;
    console.log("enter value",enteredNumber)

    if (event.key === 'Enter') {
      this.openPopup(enteredNumber,job);
      console.log(event,"event");
      console.log(job,"job");
    }
  }

getselecteddivisions(){
  return this.selectdivision;
}
singleconvert(data:any){
  //added co if starts
     let  GetAllvalues = data;
        let Gridwithmultiplefilesname:any[] = [];
        console.log(data,"GETTINGDATA");
        
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
           DivisionId:this.getselecteddivisions(),// //
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
 Gridwithmultiplefilesname.push(GetAddList);
        let senddata={
          "id": 0,
          "dateofReceived": "2023-05-12T07:08:03.495Z",
          "clientName": "string",
          "clientJobId": "string",
          "fileName": "string",
          "jobStatusDescription": "string",
          "username": "string",
          "salesPersonName": "string",
          "clientSalesPerson": "string",
          customerName: "string",
          "temp": "string",
          "style": "string",
          "projectCode": "string",
          "teamCode": "string",
          "schoolName": "string",
          ground: "string",
          gender: "string",
          fileInwardMode: "string",
          "status": true,
          "fileReceivedDate": "2023-05-12T07:08:03.495Z",
          "jobDescription": "string",
          "jobStatusId": 0,
          "departmentId": 0,
          "divisionId": 0,
          "employeeId": 0,
          "clientId": 0,
          "remarks": "string",
          "poNo": "string",
          "fileInwardTypeId": 0,
          "color": "string",
          "logoDimensionWidth": "string",
          "logoDimensionsLength": "string",
          "apparelLogoLocation": "string",
          imprintColors1: "string",
          imprintColors2: "string",
          imprintColors3: "string",
          "virtualProof": "string",
          "dateofUpload": "2023-05-12T07:08:03.495Z",
          "dateofClose": "2023-05-12T07:08:03.495Z",
          "customerJobType": "string",
          "jobDate": "2023-05-12T07:08:03.495Z",
          "clientOrderId": 0,
          "viewDatas": [
            {
              "id": 0,
              "department": "string",
              "clientStatus": "string",
              "dateofReceived": "2023-05-12T07:08:03.495Z",
              "clientName": "string",
              "clientJobId": "string",
              "fileName": "string",
              "jobStatusDescription": "string",
              "username": "string",
              "salesPersonName": "string",
              "customerName": "string",
              "temp": "string",
              "style": "string",
              "projectCode": "string",
              "teamCode": "string",
              "schoolName": "string",
              "ground": "string",
              "gender": "string",
              "fileInwardMode": "string",
              "status": true,
              "dateofUpload": "string",
              "priority": "string",
              "clientSalesPerson": "string",
              "poNo": "string",
              "dateofDelivery": "string",
              "division": "string",
              "uploadedBy": 0
            }
          ],
          "createdBy": 0,
          "poDate": "2023-05-12T07:08:03.495Z",
          "ccId": 0,
          "ccEmailId": "string",
          "dateofDelivery": "2023-05-12T07:08:03.495Z",
          "getAllValues": Gridwithmultiplefilesname
        };

    let  joborderconverted = {
            GetAllValues:Gridwithmultiplefilesname,
        }
    
       console.log(senddata,"fileconvertdata");
       
 this.http.post<any>('https://localhost:7208/api/JobOrder/DirectOrder',senddata).subscribe(convertdata => 
 {
console.log("succesfully converted data");

 })

    } // added co if ends


    multiconvert(){
       //added co if starts 
      let Gridwithmultiplefilesname:any[] = [];
            for (var i = 0; i < this.selectedproduction.length; i++) {
             let  GetAllvalues =this.selectedproduction[i];
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
                 DivisionId:this.getselecteddivisions(),// //
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
            
               Gridwithmultiplefilesname.push(GetAddList);
            }
               let senddata={
                "id": 0,
                "dateofReceived": "2023-05-12T07:08:03.495Z",
                "clientName": "string",
                "clientJobId": "string",
                "fileName": "string",
                "jobStatusDescription": "string",
                "username": "string",
                "salesPersonName": "string",
                "clientSalesPerson": "string",
                customerName: "string",
                "temp": "string",
                "style": "string",
                "projectCode": "string",
                "teamCode": "string",
                "schoolName": "string",
                ground: "string",
                gender: "string",
                fileInwardMode: "string",
                "status": true,
                "fileReceivedDate": "2023-05-12T07:08:03.495Z",
                "jobDescription": "string",
                "jobStatusId": 0,
                "departmentId": 0,
                "divisionId": 0,
                "employeeId": 0,
                "clientId": 0,
                "remarks": "string",
                "poNo": "string",
                "fileInwardTypeId": 0,
                "color": "string",
                "logoDimensionWidth": "string",
                "logoDimensionsLength": "string",
                "apparelLogoLocation": "string",
                imprintColors1: "string",
                imprintColors2: "string",
                imprintColors3: "string",
                "virtualProof": "string",
                "dateofUpload": "2023-05-12T07:08:03.495Z",
                "dateofClose": "2023-05-12T07:08:03.495Z",
                "customerJobType": "string",
                "jobDate": "2023-05-12T07:08:03.495Z",
                "clientOrderId": 0,
                "viewDatas": [
                  {
                    "id": 0,
                    "department": "string",
                    "clientStatus": "string",
                    "dateofReceived": "2023-05-12T07:08:03.495Z",
                    "clientName": "string",
                    "clientJobId": "string",
                    "fileName": "string",
                    "jobStatusDescription": "string",
                    "username": "string",
                    "salesPersonName": "string",
                    "customerName": "string",
                    "temp": "string",
                    "style": "string",
                    "projectCode": "string",
                    "teamCode": "string",
                    "schoolName": "string",
                    "ground": "string",
                    "gender": "string",
                    "fileInwardMode": "string",
                    "status": true,
                    "dateofUpload": "string",
                    "priority": "string",
                    "clientSalesPerson": "string",
                    "poNo": "string",
                    "dateofDelivery": "string",
                    "division": "string",
                    "uploadedBy": 0
                  }
                ],
                "createdBy": 0,
                "poDate": "2023-05-12T07:08:03.495Z",
                "ccId": 0,
                "ccEmailId": "string",
                "dateofDelivery": "2023-05-12T07:08:03.495Z",
                "getAllValues": Gridwithmultiplefilesname
              };
              this.http.post<any>('https://localhost:7208/api/JobOrder/DirectOrder',senddata).subscribe(multorder => 
              {
             console.log("succesfully converted data");
             
              })     
    } 
   

    clientDetailsPop(id){
      this.dialog.open(ClientdetailspopupComponent, {
        width:'100vw',
        data: {
          id: id
        }
    });


}




}



