import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/Environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-it-assetindex',
  templateUrl: './it-assetindex.component.html',
  styleUrls: ['./it-assetindex.component.scss']
})
export class ItAssetindexComponent implements OnInit {
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private router: Router,private _coreService: CoreService, private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService, private _dialog: MatDialog, private spinnerService: SpinnerService) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['baynumber', 'location', 'pcname','pctype', 'roll', 'workingstatus', 'Action'];

  fetchtableData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetTableITAsset`).subscribe(data => {
      console.log(data, "fetchdata");
      this.dataSource = new MatTableDataSource(data.titDetailList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openvendor() {
    this.router.navigate(['/topnavbar/addITAsset']);
  }

  openEditForm(data: any) {
    // const dialogRef = this._dialog.open(AddchecklistComponent, {
    //   height: '60vh',
    //   width: '50vw',
    //   data: {
    //     type: "edit",
    //     data: data,
    //   },
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.fetchtableData();
    //     }
    //   },
    // });
  }

  deleteEmployee(id: number) {
    // this.spinnerService.requestStarted();

    // this.checklistservice.deleteEmployee(id).subscribe({
    //   next: (res) => {
    //     this.spinnerService.requestEnded();

    //     this._coreService.openSnackBar('Employee deleted!', 'done');
    //     this.fetchtableData();
    //   },
    //   error: console.log,
    // });
  }


  openViewForm(data: any) {
    // const dialogRef = this._dialog.open(ViewchecklistComponent, {
    //   height: '60vh',
    //   width: '50vw',
    //   data
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.fetchtableData();
    //     }
    //   },
    // });
  }
}
