import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableSettings, User } from 'src/app/core/models/employee.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  settings: TableSettings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Name',
        class: 'pointer',
      },

      phone: {
        title: 'Phone',
      },

      email: {
        title: 'Email',
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10,
    },
  };
  data: User[] = [];
  private subs = new SubSink();
  constructor(private _api: ApiService, private _router: Router) {}
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.subs.add(
      this._api.getAllEmployee().subscribe((res) => (this.data = res))
    );
  }
  onUserRowSelect(event: any): void {
    this._router.navigate([`/dashboard/employee/${event.data.id}`]);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
