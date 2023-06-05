import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

import { ApiService } from 'src/app/core/service/api.service';
import {
  TodoList,
  TableSettings,
} from 'src/app/core/models/employee.interface';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('addTaskModal') addTaskModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

  dataList: TodoList[] = [];
  settings: TableSettings = {
    columns: {
      id: {
        title: 'ID',
      },
      title: {
        title: 'Title',
        class: 'pointer',
      },
      completed: {
        title: 'Status',
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
  status!: string;
  filteredList: TodoList[] = [];
  title!: string;
  userId!: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  private subs = new SubSink();

  constructor(private activated: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.subs.add(
      this.activated.params.subscribe((res) => {
        this.userId = res['id'];
        this.getEmployeeTask();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getEmployeeTask(): void {
    this.subs.add(
      this.api.viewEmployeeTaskById(this.userId).subscribe((res) => {
        this.dataList = res;
        this.filteredList = res;
      })
    );
  }

  onStatusChange(): void {
    this.filteredList = this.dataList.filter(
      (value) => value.completed.toString() === this.status.toString()
    );
    console.log(this.filteredList, this.status);
  }

  addTask(): void {
    this.dataList.push({
      id: this.dataList.length + 1,
      userId: this.userId,
      title: this.title,
      completed: 'false',
    });
    this.closeModal.nativeElement.click();
    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
  }
}
