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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {
  @ViewChild('addTaskModal') addTaskModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

  status: string = 'all';
  filteredList: TodoList[] = [];
  title!: string;
  userId!: number;
  displayedColumns: string[] = ['id', 'title', 'completed'];
  dataSource!: MatTableDataSource<TodoList>;
  private subs = new SubSink();

  constructor(private activated: ActivatedRoute, private api: ApiService) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
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
        this.dataSource = new MatTableDataSource<TodoList>(res);
        this.filteredList = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  onStatusChange(): void {
    if (this.status == 'all') {
      this.dataSource = new MatTableDataSource(this.filteredList);
    } else {
      this.dataSource = new MatTableDataSource(
        this.filteredList.filter(
          (value) => value.completed.toString() === this.status.toString()
        )
      );
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTask(): void {
    this.filteredList.push({
      id: this.filteredList.length + 1,
      userId: this.userId,
      title: this.title,
      completed: 'false',
    });
    this.dataSource = new MatTableDataSource(this.filteredList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.closeModal.nativeElement.click();
    this.resetForm();
  }

  resetForm(): void {
    this.title = '';
  }
}
