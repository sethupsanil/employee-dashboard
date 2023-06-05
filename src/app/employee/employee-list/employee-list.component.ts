import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/employee.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource!: MatTableDataSource<User>;
  employeeList: User[] = [];
  searchValue!: string;
  totalCount: number = 0;
  private subs = new SubSink();
  constructor(private _api: ApiService, private _router: Router) {}
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.subs.add(
      this._api.getAllEmployee().subscribe((res) => {
        this.employeeList = res;
        this.dataSource = new MatTableDataSource<User>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalCount = this.dataSource.data.length;
      })
    );
  }
  onSearch() {
    this.searchValue = this.searchValue.toLowerCase();
    this.dataSource = new MatTableDataSource(
      this.employeeList.filter(
        (value) =>
          value.email.toLowerCase().includes(this.searchValue) ||
          value.name.toLowerCase().includes(this.searchValue) ||
          value.phone.toLowerCase().includes(this.searchValue) ||
          value.id.toString().toLowerCase().includes(this.searchValue)
      )
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.totalCount = this.dataSource.data.length;
  }
  onUserRowSelect(event: any): void {
    this._router.navigate([`/dashboard/employee/${event.id}`]);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
