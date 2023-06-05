import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CoreModule } from '../core/core.module';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@NgModule({
  declarations: [EmployeeListComponent, ViewEmployeeComponent],
  imports: [CommonModule, EmployeeRoutingModule, CoreModule],
})
export class EmployeeModule {}
